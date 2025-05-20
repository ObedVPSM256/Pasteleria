"use client";

import React, { useState, useEffect } from "react";
import { getIngredientes, getRecetas, crearPastel, reabastecerIngrediente } from "@/libs/db/recetas";
import Sidebar from "@/components/form/sidebar";

interface Ingrediente {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Receta {
  id: number;
  nombre: string;
  descripcion: string | null;
  ingredientes: {
    cantidad: number;
    ingrediente: Ingrediente;
  }[];
}

const App = () => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState<number | null>(null);
  const [cantidadReabastecer, setCantidadReabastecer] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [ingredientesData, recetasData] = await Promise.all([
        getIngredientes(),
        getRecetas()
      ]);
      setIngredientes(ingredientesData);
      setRecetas(recetasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCrearPastel = async (recetaId: number) => {
    setError(null);
    try {
      await crearPastel(recetaId);
      await cargarDatos();
      alert("✅ Pastel creado con éxito.");
    } catch (error) {
      console.error('Error al crear pastel:', error);
      setError(error instanceof Error ? error.message : 'Error al crear el pastel');
    }
  };

  const handleReabastecer = async () => {
    if (!ingredienteSeleccionado) {
      setError('Por favor, seleccione un ingrediente');
      return;
    }

    if (cantidadReabastecer <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }

    setError(null);
    try {
      await reabastecerIngrediente(ingredienteSeleccionado, cantidadReabastecer);
      await cargarDatos();
      setModalOpen(false);
      alert("✅ Ingrediente reabastecido.");
    } catch (error) {
      console.error('Error al reabastecer:', error);
      setError(error instanceof Error ? error.message : 'Error al reabastecer');
    }
  };

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-rose-700 mb-8">
          🍰 Sistema de Inventario de Pastelería
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando datos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Ingredientes */}
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-rose-200 text-rose-900">
                <tr>
                  <th className="p-3 text-left">Ingrediente</th>
                  <th className="p-3 text-left">Cantidad</th>
                  <th className="p-3 text-left">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ingr) => (
                  <tr key={ingr.id} className="border-t">
                    <td className="p-3">{ingr.nombre}</td>
                    <td className="p-3">{ingr.cantidad}</td>
                    <td className="p-3">{ingr.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Recetas */}
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-rose-200 text-rose-900">
                <tr>
                  <th className="p-3 text-left">Receta</th>
                  <th className="p-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {recetas.map((receta) => (
                  <tr key={receta.id} className="border-t">
                    <td className="p-3">{receta.nombre}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleCrearPastel(receta.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg shadow-md"
                      >
                        🎂 Crear
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mb-6">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
            🔄 Reabastecer Ingredientes
          </button>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Reabastecer Ingrediente</h3>
              <label className="block mb-2">Ingrediente:</label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={ingredienteSeleccionado || ''}
                onChange={(e) => setIngredienteSeleccionado(Number(e.target.value) || null)}
              >
                <option value="">Seleccione un ingrediente</option>
                {ingredientes.map((ingr) => (
                  <option key={ingr.id} value={ingr.id}>
                    {ingr.nombre}
                  </option>
                ))}
              </select>
              <label className="block mb-2">Cantidad:</label>
              <input
                type="number"
                min="1"
                className="w-full p-2 border rounded mb-4"
                value={cantidadReabastecer}
                onChange={(e) => setCantidadReabastecer(Number(e.target.value))}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleReabastecer}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Reabastecer
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 