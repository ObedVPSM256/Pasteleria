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
  async updatePedidoEstado(pedidoId: number, nuevoEstado: string) {
    const response = await api.patch(`/pedidos/${pedidoId}/estado`, { estado: nuevoEstado });
    return response.data;
  },

  // Obtener todos los pedidos (para administradores)
  async getAllPedidos() {
    const response = await api.get('/pedidos');
    return response.data;
  }
}; 