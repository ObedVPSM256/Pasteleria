import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import { mkdir } from "fs/promises";
import cloudinary from "@/libs/cloudinary";

// Helper function para validar ID
// Helper function para validar ID
const validateUserId = (id) => {
  const userId = Number(id);
  if (isNaN(userId)) {
    return { error: "ID de usuario no válido" };
  }
  return { userId };
};

// GET /api/profile/[id]
export async function GET(request, { params }) {
  try {
    // Validar ID
    const { userId, error } = validateUserId(params.id);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const user = await prisma.USER.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        telefono: true,
        rol: true,
        createdDT: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// POST /api/profile/[id]
export async function POST(request, { params }) {
  try {
    // Validar ID
    const { userId, error } = validateUserId(params.id);
    if (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const formData = await request.formData();
    const profilePicture = formData.get("profilePicture");
    let urlImage = null;

    // Procesar imagen si se proporcionó
    if (profilePicture && typeof profilePicture === "object") {
      try {
        const byte = await profilePicture.arrayBuffer();
        const buffer = Buffer.from(byte);
        
        // Crear directorio si no existe
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true }).catch(() => {});  // Si no existe, lo crea sin fallar
        
        const filePath = path.join(uploadDir, profilePicture.name);
        await writeFile(filePath, buffer);

        // Subir a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          folder: "user-profiles"
        });
        urlImage = uploadResult.secure_url;

        // Eliminar archivo temporal
        await unlink(filePath);
      } catch (uploadError) {
        console.error("Error al procesar imagen:", uploadError);
        return NextResponse.json(
          { message: "Error al procesar la imagen" },
          { status: 500 }
        );
      }
    }

    // Obtener usuario actual
    const currentUser = await prisma.USER.findUnique({
      where: { id: userId }
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Preparar datos para actualizar
    const updateData = {};
    const fieldsToCheck = ["username", "email", "telefono"];

    fieldsToCheck.forEach(field => {
      const value = formData.get(field);
      if (value && value !== currentUser[field]) {
        updateData[field] = value;
      }
    });

    // Manejar contraseña por separado
    const newPassword = formData.get("password");
    if (newPassword) {
      const isSamePassword = await bcrypt.compare(newPassword, currentUser.password);
      if (!isSamePassword) {
        updateData.password = await bcrypt.hash(newPassword, 10);
      }
    }

    // Agregar imagen si se subió
    if (urlImage && urlImage !== currentUser.profilePicture) {
      updateData.profilePicture = urlImage;
    }

    // Verificar si hay cambios reales
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No se detectaron cambios" },
        { status: 200 }
      );
    }

    // Actualizar usuario
    const updatedUser = await prisma.USER.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        telefono: true,
        rol: true
      }
    });

    return NextResponse.json(
      { 
        message: "Perfil actualizado correctamente",
        user: updatedUser 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
