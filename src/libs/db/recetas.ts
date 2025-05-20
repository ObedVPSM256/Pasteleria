import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getIngredientes() {
  return await prisma.ingrediente.findMany();
}

export async function getRecetas() {
  return await prisma.receta.findMany({
    include: {
      ingredientes: {
        include: {
          ingrediente: true
        }
      }
    }
  });
}

export async function crearPastel(recetaId: number) {
  // Obtener la receta con sus ingredientes
  const receta = await prisma.receta.findUnique({
    where: { id: recetaId },
    include: {
      ingredientes: {
        include: {
          ingrediente: true
        }
      }
    }
  });

  if (!receta) {
    throw new Error('Receta no encontrada');
  }

  // Verificar si hay suficientes ingredientes
  for (const recetaIng of receta.ingredientes) {
    const ingrediente = recetaIng.ingrediente;
    if (ingrediente.cantidad < recetaIng.cantidad) {
      throw new Error(`No hay suficiente ${ingrediente.nombre}`);
    }
  }

  // Actualizar las cantidades de los ingredientes
  for (const recetaIng of receta.ingredientes) {
    await prisma.ingrediente.update({
      where: { id: recetaIng.ingrediente_id },
      data: {
        cantidad: {
          decrement: recetaIng.cantidad
        }
      }
    });
  }

  return true;
}

export async function reabastecerIngrediente(ingredienteId: number, cantidad: number) {
  if (cantidad <= 0) {
    throw new Error('La cantidad debe ser mayor a 0');
  }

  return await prisma.ingrediente.update({
    where: { id: ingredienteId },
    data: {
      cantidad: {
        increment: cantidad
      }
    }
  });
}

// Función para inicializar datos de ejemplo
export async function inicializarDatos() {
  // Crear ingredientes
  const ingredientes = await Promise.all([
    prisma.ingrediente.create({
      data: {
        nombre: 'Harina',
        cantidad: 8,
        unidad: 'kg'
      }
    }),
    prisma.ingrediente.create({
      data: {
        nombre: 'Huevos',
        cantidad: 12,
        unidad: 'piezas'
      }
    }),
    prisma.ingrediente.create({
      data: {
        nombre: 'Azúcar',
        cantidad: 5,
        unidad: 'kg'
      }
    }),
    prisma.ingrediente.create({
      data: {
        nombre: 'Leche',
        cantidad: 3,
        unidad: 'litros'
      }
    })
  ]);

  // Crear receta de tres leches
  const recetaTresLeches = await prisma.receta.create({
    data: {
      nombre: 'Pastel de Tres Leches',
      descripcion: 'Delicioso pastel de tres leches tradicional',
      ingredientes: {
        create: [
          {
            ingrediente_id: ingredientes[0].id, // Harina
            cantidad: 1
          },
          {
            ingrediente_id: ingredientes[1].id, // Huevos
            cantidad: 3
          },
          {
            ingrediente_id: ingredientes[2].id, // Azúcar
            cantidad: 1
          },
          {
            ingrediente_id: ingredientes[3].id, // Leche
            cantidad: 1
          }
        ]
      }
    }
  });

  return { ingredientes, recetaTresLeches };
} 