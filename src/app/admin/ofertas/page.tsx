"use client"

import { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import Sidebar from '@/components/form/sidebar';

interface Oferta {
  id: number;
  nombre: string;
  tipo: 'porcentaje' | 'monto_fijo';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
  productos: number[];
}

interface Descuento {
  id: number;
  codigo: string;
  tipo: 'porcentaje' | 'monto_fijo';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  usoMaximo: number;
  usoActual: number;
}

export default function OfertasAdmin() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [mostrarFormOferta, setMostrarFormOferta] = useState(false);
  const [mostrarFormDescuento, setMostrarFormDescuento] = useState(false);
  const [ofertaEdicion, setOfertaEdicion] = useState<Oferta | null>(null);
  const [descuentoEdicion, setDescuentoEdicion] = useState<Descuento | null>(null);

  const guardarOferta = (oferta: Oferta) => {
    if (ofertaEdicion) {
      setOfertas(ofertas.map(o => o.id === oferta.id ? oferta : o));
    } else {
      setOfertas([...ofertas, { ...oferta, id: Date.now() }]);
    }
    setMostrarFormOferta(false);
    setOfertaEdicion(null);
  };

  const guardarDescuento = (descuento: Descuento) => {
    if (descuentoEdicion) {
      setDescuentos(descuentos.map(d => d.id === descuento.id ? descuento : d));
    } else {
      setDescuentos([...descuentos, { ...descuento, id: Date.now() }]);
    }
    setMostrarFormDescuento(false);
    setDescuentoEdicion(null);
  };

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Ofertas y Descuentos</h1>

        {/* Sección de Ofertas */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ofertas Especiales</h2>
            <button
              onClick={() => setMostrarFormOferta(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
            >
              <Plus size={20} />
              Nueva Oferta
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vigencia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ofertas.map((oferta) => (
                  <tr key={oferta.id}>
                    <td className="px-6 py-4">{oferta.nombre}</td>
                    <td className="px-6 py-4">{oferta.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto Fijo'}</td>
                    <td className="px-6 py-4">{oferta.valor}{oferta.tipo === 'porcentaje' ? '%' : '$'}</td>
                    <td className="px-6 py-4">{new Date(oferta.fechaInicio).toLocaleDateString()} - {new Date(oferta.fechaFin).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${oferta.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {oferta.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setOfertaEdicion(oferta);
                          setMostrarFormOferta(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setOfertas(ofertas.filter(o => o.id !== oferta.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Descuentos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Códigos de Descuento</h2>
            <button
              onClick={() => setMostrarFormDescuento(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
            >
              <Plus size={20} />
              Nuevo Descuento
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vigencia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {descuentos.map((descuento) => (
                  <tr key={descuento.id}>
                    <td className="px-6 py-4">{descuento.codigo}</td>
                    <td className="px-6 py-4">{descuento.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto Fijo'}</td>
                    <td className="px-6 py-4">{descuento.valor}{descuento.tipo === 'porcentaje' ? '%' : '$'}</td>
                    <td className="px-6 py-4">{descuento.usoActual}/{descuento.usoMaximo}</td>
                    <td className="px-6 py-4">{new Date(descuento.fechaInicio).toLocaleDateString()} - {new Date(descuento.fechaFin).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${descuento.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {descuento.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setDescuentoEdicion(descuento);
                          setMostrarFormDescuento(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDescuentos(descuentos.filter(d => d.id !== descuento.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Oferta */}
        {mostrarFormOferta && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{ofertaEdicion ? 'Editar Oferta' : 'Nueva Oferta'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                guardarOferta({
                  id: ofertaEdicion?.id || 0,
                  nombre: formData.get('nombre') as string,
                  tipo: formData.get('tipo') as 'porcentaje' | 'monto_fijo',
                  valor: Number(formData.get('valor')),
                  fechaInicio: formData.get('fechaInicio') as string,
                  fechaFin: formData.get('fechaFin') as string,
                  activa: true,
                  productos: []
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      defaultValue={ofertaEdicion?.nombre}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                      name="tipo"
                      defaultValue={ofertaEdicion?.tipo}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    >
                      <option value="porcentaje">Porcentaje</option>
                      <option value="monto_fijo">Monto Fijo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valor</label>
                    <input
                      type="number"
                      name="valor"
                      defaultValue={ofertaEdicion?.valor}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      defaultValue={ofertaEdicion?.fechaInicio}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                    <input
                      type="date"
                      name="fechaFin"
                      defaultValue={ofertaEdicion?.fechaFin}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarFormOferta(false);
                      setOfertaEdicion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                  >
                    {ofertaEdicion ? 'Guardar Cambios' : 'Crear Oferta'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Descuento */}
        {mostrarFormDescuento && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{descuentoEdicion ? 'Editar Descuento' : 'Nuevo Descuento'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                guardarDescuento({
                  id: descuentoEdicion?.id || 0,
                  codigo: formData.get('codigo') as string,
                  tipo: formData.get('tipo') as 'porcentaje' | 'monto_fijo',
                  valor: Number(formData.get('valor')),
                  fechaInicio: formData.get('fechaInicio') as string,
                  fechaFin: formData.get('fechaFin') as string,
                  activo: true,
                  usoMaximo: Number(formData.get('usoMaximo')),
                  usoActual: descuentoEdicion?.usoActual || 0
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código</label>
                    <input
                      type="text"
                      name="codigo"
                      defaultValue={descuentoEdicion?.codigo}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                      name="tipo"
                      defaultValue={descuentoEdicion?.tipo}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    >
                      <option value="porcentaje">Porcentaje</option>
                      <option value="monto_fijo">Monto Fijo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valor</label>
                    <input
                      type="number"
                      name="valor"
                      defaultValue={descuentoEdicion?.valor}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Uso Máximo</label>
                    <input
                      type="number"
                      name="usoMaximo"
                      defaultValue={descuentoEdicion?.usoMaximo}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      defaultValue={descuentoEdicion?.fechaInicio}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                    <input
                      type="date"
                      name="fechaFin"
                      defaultValue={descuentoEdicion?.fechaFin}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarFormDescuento(false);
                      setDescuentoEdicion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                  >
                    {descuentoEdicion ? 'Guardar Cambios' : 'Crear Descuento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 