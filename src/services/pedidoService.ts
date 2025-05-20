import { api } from './api';

export const pedidoService = {
  // Crear un nuevo pedido
  async createPedido(pedidoData: {
    usuarioId: number;
    total: number;
    direccionEnvio: string;
    instrucciones: string;
    items: {
      pastelId: number;
      cantidad: number;
      precio: number;
    }[];
  }) {
    const response = await api.post('/pedidos', pedidoData);
    return response.data;
  },

  // Obtener pedidos de un usuario
  async getPedidosByUsuario(usuarioId: number) {
    const response = await api.get(`/pedidos/usuario/${usuarioId}`);
    return response.data;
  },

  // Obtener un pedido por ID
  async getPedidoById(id: number) {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },

  // Actualizar estado del pedido
  async updatePedidoEstado(id: number, estado: string) {
    // This method is not provided in the original file or the new implementation
    // It's assumed to exist as it's called in the original file
    // Implementation needed
  },

  // Obtener todos los pedidos (para administradores)
  async getAllPedidos() {
    // This method is not provided in the original file or the new implementation
    // It's assumed to exist as it's called in the original file
    // Implementation needed
  }
}; 