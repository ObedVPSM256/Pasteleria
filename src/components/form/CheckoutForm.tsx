"use client";

import { useState } from 'react';
import { useCarrito } from '@/context/CarritoContext';
import { CreditCard, MapPin, Clock, CheckCircle2 } from 'lucide-react';

interface CheckoutFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Paso = 'envio' | 'pago' | 'confirmacion';

export default function CheckoutForm({ isOpen, setIsOpen }: CheckoutFormProps) {
  const { carrito, limpiarCarrito } = useCarrito();
  const [pasoActual, setPasoActual] = useState<Paso>('envio');
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
    instrucciones: ''
  });
  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    fechaVencimiento: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const total = carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0);

  const handleSubmitEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setPasoActual('pago');
  };

  const handleSubmitPago = (e: React.FormEvent) => {
    e.preventDefault();
    setPasoActual('confirmacion');
  };

  const handleConfirmarPedido = () => {
    // Aquí iría la lógica para procesar el pedido
    limpiarCarrito();
    setIsOpen(false);
  };

  const renderPasoEnvio = () => (
    <form onSubmit={handleSubmitEnvio} className="space-y-4">
      <div className="flex items-center gap-2 text-rose-700 mb-6">
        <MapPin size={20} />
        <h3 className="font-semibold text-lg">Información de Envío</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            required
            value={datosEnvio.nombre}
            onChange={(e) => setDatosEnvio({...datosEnvio, nombre: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            required
            value={datosEnvio.direccion}
            onChange={(e) => setDatosEnvio({...datosEnvio, direccion: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
          <input
            type="text"
            required
            value={datosEnvio.ciudad}
            onChange={(e) => setDatosEnvio({...datosEnvio, ciudad: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
          <input
            type="text"
            required
            value={datosEnvio.codigoPostal}
            onChange={(e) => setDatosEnvio({...datosEnvio, codigoPostal: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            required
            value={datosEnvio.telefono}
            onChange={(e) => setDatosEnvio({...datosEnvio, telefono: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones de Entrega (opcional)</label>
          <textarea
            value={datosEnvio.instrucciones}
            onChange={(e) => setDatosEnvio({...datosEnvio, instrucciones: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
        >
          Continuar al Pago
        </button>
      </div>
    </form>
  );

  const renderPasoPago = () => (
    <form onSubmit={handleSubmitPago} className="space-y-4">
      <div className="flex items-center gap-2 text-rose-700 mb-6">
        <CreditCard size={20} />
        <h3 className="font-semibold text-lg">Información de Pago</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
          <input
            type="text"
            required
            value={datosPago.numeroTarjeta}
            onChange={(e) => setDatosPago({...datosPago, numeroTarjeta: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la Tarjeta</label>
          <input
            type="text"
            required
            value={datosPago.nombreTarjeta}
            onChange={(e) => setDatosPago({...datosPago, nombreTarjeta: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
            <input
              type="text"
              required
              value={datosPago.fechaVencimiento}
              onChange={(e) => setDatosPago({...datosPago, fechaVencimiento: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              placeholder="MM/AA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="text"
              required
              value={datosPago.cvv}
              onChange={(e) => setDatosPago({...datosPago, cvv: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              placeholder="123"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setPasoActual('envio')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Volver
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
        >
          Confirmar Pedido
        </button>
      </div>
    </form>
  );

  const renderPasoConfirmacion = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-rose-700 mb-6">
        <CheckCircle2 size={20} />
        <h3 className="font-semibold text-lg">Confirmación de Pedido</h3>
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <h4 className="font-medium text-rose-900 mb-2">Resumen del Pedido</h4>
        <ul className="space-y-2">
          {carrito.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>{item.nombre} x{item.cantidad || 1}</span>
              <span>${item.precio * (item.cantidad || 1)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-rose-200 mt-2 pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <h4 className="font-medium text-rose-900 mb-2">Información de Envío</h4>
        <p className="text-sm text-gray-600">
          {datosEnvio.nombre}<br />
          {datosEnvio.direccion}<br />
          {datosEnvio.ciudad}, {datosEnvio.codigoPostal}<br />
          Tel: {datosEnvio.telefono}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setPasoActual('pago')}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Volver
        </button>
        <button
          onClick={handleConfirmarPedido}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Barra de progreso */}
          <div className="flex justify-between mb-8">
            {(['envio', 'pago', 'confirmacion'] as Paso[]).map((paso, index) => (
              <div key={paso} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  pasoActual === paso 
                    ? 'bg-pink-600 text-white' 
                    : index < ['envio', 'pago', 'confirmacion'].indexOf(pasoActual)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-24 h-1 ${
                    index < ['envio', 'pago', 'confirmacion'].indexOf(pasoActual)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Contenido del paso actual */}
          {pasoActual === 'envio' && renderPasoEnvio()}
          {pasoActual === 'pago' && renderPasoPago()}
          {pasoActual === 'confirmacion' && renderPasoConfirmacion()}
        </div>
      </div>
    </div>
  );
} 