import { useState } from 'react';
import { useCarrito } from '@/context/CarritoContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { pedidoService } from '@/services/pedidoService';

export function CarritoLateral() {
  const { carrito, agregarAlCarrito, quitarDelCarrito, limpiarCarrito, total } = useCarrito();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí normalmente obtendríamos el ID del usuario de la sesión
      const usuarioId = 1; // Por ahora usamos un ID fijo

      await pedidoService.createPedido({
        usuarioId,
        total,
        direccionEnvio,
        instrucciones,
        items: carrito.map(item => ({
          pastelId: item.id,
          cantidad: item.cantidad || 1,
          precio: item.precio
        }))
      });

      limpiarCarrito();
      setShowCheckout(false);
      setIsOpen(false);
      setDireccionEnvio('');
      setInstrucciones('');
      
      // Aquí podrías mostrar un mensaje de éxito
      alert('¡Pedido realizado con éxito!');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {carrito.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {carrito.length}
          </span>
        )}
      </button>

      {/* Panel lateral */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {carrito.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {carrito.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                          <p className="text-pink-600 font-bold">${item.precio}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => quitarDelCarrito(item.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.cantidad}</span>
                            <button
                              onClick={() => agregarAlCarrito(item)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => quitarDelCarrito(item.id, true)}
                              className="p-1 hover:bg-red-100 rounded ml-auto"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">${total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Envío</span>
                      <span className="text-green-600 font-bold">Gratis</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-pink-600">${total}</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Proceder al Pago
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Formulario de pago */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección de Envío
                    </label>
                    <input
                      type="text"
                      required
                      value={direccionEnvio}
                      onChange={(e) => setDireccionEnvio(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Ingresa tu dirección completa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instrucciones Especiales
                    </label>
                    <textarea
                      value={instrucciones}
                      onChange={(e) => setInstrucciones(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Alergias, preferencias, etc."
                      rows={3}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Total a Pagar</span>
                      <span className="text-2xl font-bold text-pink-600">${total}</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-pink-600 text-white py-3 rounded-lg transition-colors ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
                      }`}
                    >
                      {isLoading ? 'Procesando...' : 'Confirmar Pedido'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 