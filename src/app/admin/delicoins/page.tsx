"use client"

import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import Sidebar from '@/components/form/sidebar';

interface NivelFidelidad {
  id: number;
  nombre: string;
  puntosRequeridos: number;
  beneficios: string[];
}

interface Recompensa {
  id: number;
  nombre: string;
  descripcion: string;
  costoPuntos: number;
  activa: boolean;
}

export default function DelicoinsAdmin() {
  const [niveles, setNiveles] = useState<NivelFidelidad[]>([
    {
      id: 1,
      nombre: 'Bronze',
      puntosRequeridos: 0,
      beneficios: ['1 Delicoin por cada $1 gastado']
    },
    {
      id: 2,
      nombre: 'Silver',
      puntosRequeridos: 1000,
      beneficios: ['1.2 Delicoins por cada $1 gastado', 'Descuento del 5% en cumpleaños']
    },
    {
      id: 3,
      nombre: 'Gold',
      puntosRequeridos: 5000,
      beneficios: ['1.5 Delicoins por cada $1 gastado', 'Descuento del 10% en cumpleaños', 'Envío gratis']
    }
  ]);

  const [recompensas, setRecompensas] = useState<Recompensa[]>([
    {
      id: 1,
      nombre: '10% de Descuento',
      descripcion: 'Aplica un 10% de descuento en tu próxima compra',
      costoPuntos: 500,
      activa: true
    },
    {
      id: 2,
      nombre: 'Pastel Gratis',
      descripcion: 'Obtén un pastel gratis de hasta $300',
      costoPuntos: 1000,
      activa: true
    },
    {
      id: 3,
      nombre: 'Box de Cupcakes',
      descripcion: 'Box de 6 cupcakes personalizados',
      costoPuntos: 750,
      activa: true
    }
  ]);

  const [mostrarFormNivel, setMostrarFormNivel] = useState(false);
  const [mostrarFormRecompensa, setMostrarFormRecompensa] = useState(false);
  const [nivelEdicion, setNivelEdicion] = useState<NivelFidelidad | null>(null);
  const [recompensaEdicion, setRecompensaEdicion] = useState<Recompensa | null>(null);

  const guardarNivel = (nivel: NivelFidelidad) => {
    if (nivelEdicion) {
      setNiveles(niveles.map(n => n.id === nivel.id ? nivel : n));
    } else {
      setNiveles([...niveles, { ...nivel, id: Date.now() }]);
    }
    setMostrarFormNivel(false);
    setNivelEdicion(null);
  };

  const guardarRecompensa = (recompensa: Recompensa) => {
    if (recompensaEdicion) {
      setRecompensas(recompensas.map(r => r.id === recompensa.id ? recompensa : r));
    } else {
      setRecompensas([...recompensas, { ...recompensa, id: Date.now() }]);
    }
    setMostrarFormRecompensa(false);
    setRecompensaEdicion(null);
  };

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Configuración del Programa Delicoins</h1>

        {/* Sección de Niveles de Fidelidad */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Niveles de Fidelidad</h2>
            <button
              onClick={() => setMostrarFormNivel(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
            >
              <Plus size={20} />
              Nuevo Nivel
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puntos Requeridos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficios</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {niveles.map((nivel) => (
                  <tr key={nivel.id}>
                    <td className="px-6 py-4">{nivel.nombre}</td>
                    <td className="px-6 py-4">{nivel.puntosRequeridos} puntos</td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside">
                        {nivel.beneficios.map((beneficio, index) => (
                          <li key={index} className="text-sm text-gray-600">{beneficio}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setNivelEdicion(nivel);
                          setMostrarFormNivel(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setNiveles(niveles.filter(n => n.id !== nivel.id))}
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

        {/* Sección de Recompensas */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recompensas Disponibles</h2>
            <button
              onClick={() => setMostrarFormRecompensa(true)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
            >
              <Plus size={20} />
              Nueva Recompensa
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recompensa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recompensas.map((recompensa) => (
                  <tr key={recompensa.id}>
                    <td className="px-6 py-4">{recompensa.nombre}</td>
                    <td className="px-6 py-4">{recompensa.descripcion}</td>
                    <td className="px-6 py-4">{recompensa.costoPuntos} Delicoins</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${recompensa.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {recompensa.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setRecompensaEdicion(recompensa);
                          setMostrarFormRecompensa(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setRecompensas(recompensas.filter(r => r.id !== recompensa.id))}
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

        {/* Modal de Nivel */}
        {mostrarFormNivel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{nivelEdicion ? 'Editar Nivel' : 'Nuevo Nivel'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                guardarNivel({
                  id: nivelEdicion?.id || 0,
                  nombre: formData.get('nombre') as string,
                  puntosRequeridos: Number(formData.get('puntosRequeridos')),
                  beneficios: (formData.get('beneficios') as string).split('\n').filter(b => b.trim() !== '')
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del Nivel</label>
                    <input
                      type="text"
                      name="nombre"
                      defaultValue={nivelEdicion?.nombre}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Puntos Requeridos</label>
                    <input
                      type="number"
                      name="puntosRequeridos"
                      defaultValue={nivelEdicion?.puntosRequeridos}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Beneficios (uno por línea)</label>
                    <textarea
                      name="beneficios"
                      defaultValue={nivelEdicion?.beneficios.join('\n')}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarFormNivel(false);
                      setNivelEdicion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                  >
                    {nivelEdicion ? 'Guardar Cambios' : 'Crear Nivel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Recompensa */}
        {mostrarFormRecompensa && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{recompensaEdicion ? 'Editar Recompensa' : 'Nueva Recompensa'}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                guardarRecompensa({
                  id: recompensaEdicion?.id || 0,
                  nombre: formData.get('nombre') as string,
                  descripcion: formData.get('descripcion') as string,
                  costoPuntos: Number(formData.get('costoPuntos')),
                  activa: true
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      defaultValue={recompensaEdicion?.nombre}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="descripcion"
                      defaultValue={recompensaEdicion?.descripcion}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Costo en Delicoins</label>
                    <input
                      type="number"
                      name="costoPuntos"
                      defaultValue={recompensaEdicion?.costoPuntos}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarFormRecompensa(false);
                      setRecompensaEdicion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                  >
                    {recompensaEdicion ? 'Guardar Cambios' : 'Crear Recompensa'}
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