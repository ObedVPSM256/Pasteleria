import { prisma } from '@/lib/prisma';
import { Pastel } from '@prisma/client';

export const pastelService = {
  // Obtener todos los pasteles
  async getAllPasteles() {
    return await prisma.pastel.findMany({
      orderBy: {
        createdAt: 'desc'
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
        createdAt: 'desc'
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
  async createPastel(data: Omit<Pastel, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.pastel.create({
      data
    });
  },

  // Actualizar un pastel
  async updatePastel(id: number, data: Partial<Pastel>) {
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
          { nombre: { contains: term, mode: 'insensitive' } },
          { descripcion: { contains: term, mode: 'insensitive' } },
          { etiquetas: { hasSome: [term] } }
        ]
      }
    });
  }
}; 