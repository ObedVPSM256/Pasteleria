import { prisma } from '@/lib/prisma';
import { Pedido, PedidoItem } from '@prisma/client';

export const pedidoService = {
  // Crear un nuevo pedido
  async createPedido(data: {
    usuarioId: number;
    total: number;
    direccionEnvio: string;
    instrucciones?: string;
    items: Array<{
      pastelId: number;
      cantidad: number;
      precio: number;
    }>;
  }) {
    return await prisma.pedido.create({
      data: {
        usuarioId: data.usuarioId,
        total: data.total,
        direccionEnvio: data.direccionEnvio,
        instrucciones: data.instrucciones,
        items: {
          create: data.items.map(item => ({
            pastelId: item.pastelId,
            cantidad: item.cantidad,
            precio: item.precio
          }))
        }
      },
      include: {
        items: {
          include: {
            pastel: true
          }
        }
      }
    });
  },

  // Obtener pedidos de un usuario
  async getPedidosByUsuario(usuarioId: number) {
    return await prisma.pedido.findMany({
      where: {
        usuarioId
      },
      include: {
        items: {
          include: {
            pastel: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  // Obtener un pedido por ID
  async getPedidoById(id: number) {
    return await prisma.pedido.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            pastel: true
          }
        }
      }
    });
  },

  // Actualizar estado del pedido
  async updatePedidoEstado(id: number, estado: string) {
    return await prisma.pedido.update({
      where: { id },
      data: { estado }
    });
  },

  // Obtener todos los pedidos (para administradores)
  async getAllPedidos() {
    return await prisma.pedido.findMany({
      include: {
        usuario: true,
        items: {
          include: {
            pastel: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}; 