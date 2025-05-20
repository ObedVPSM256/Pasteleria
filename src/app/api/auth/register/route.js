import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const data = await request.json();

        // Validación básica
        if (!data.email || !data.username || !data.password) {
            return NextResponse.json(
                { message: 'Email, username and password are required' },
                { status: 400 }
            );
        }

        // Verificar si el usuario o email ya existen
        const existingUser = await prisma.USER.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        });

        if (existingUser) {
            const conflictField = existingUser.email === data.email ? 'email' : 'username';
            return NextResponse.json(
                { message: `${conflictField} already exists` },
                { status: 409 }
            );
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Datos para crear el usuario
        const userData = {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            rol: data.rol || 'cliente',
            profilePicture: data.profilePicture || null,
            // Solo incluye teléfono si existe en el modelo
            ...(prisma.USER.fields.telefono && { telefono: data.telefono || null })
        };

        // Crear usuario
        const newUser = await prisma.USER.create({
            data: userData,
            select: {
                id: true,
                username: true,
                email: true,
                rol: true,
                profilePicture: true,
                ...(prisma.USER.fields.telefono && { telefono: true }),
                createdDT: true
            }
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        
        // Manejo específico para IDENTITY_INSERT
        if (error.message.includes('IDENTITY_INSERT')) {
            return NextResponse.json(
                { 
                    message: 'Database configuration issue',
                    solution: 'Contact administrator to check USER table identity settings'
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Registration failed',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}