import { prisma } from '@/lib/prisma';
import type { pastel } from '@prisma/client';

export const pastelService = {
  // Obtener todos los pasteles
  async getAllPasteles() {
    return await prisma.pastel.findMany({
      orderBy: {
        id: 'desc'
      }
    });
  },

  // Obtener pasteles destacados
  async getPastelesDestacados() {
    return await prisma.pastel.findMany({
      where: {
        destacado: true
      },
      orderBy: {
        id: 'desc'
      }
    });
  },

  // Obtener un pastel por ID
  async getPastelById(id: number) {
    return await prisma.pastel.findUnique({
      where: { id }
    });
  },

  // Crear un nuevo pastel
  async createPastel(data: Omit<pastel, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.pastel.create({
      data
    });
  },

  // Actualizar un pastel
  async updatePastel(id: number, data: Partial<pastel>) {
    return await prisma.pastel.update({
      where: { id },
      data
    });
  },

  // Eliminar un pastel
  async deletePastel(id: number) {
    return await prisma.pastel.delete({
      where: { id }
    });
  },

  // Buscar pasteles por término
  async searchPasteles(term: string) {
    return await prisma.pastel.findMany({
      where: {
        OR: [
          { nombre: { contains: term } },
          { descripcion: { contains: term } }
        ]
      }
    });
  }
}; 