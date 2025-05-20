"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/form/sidebar';
import { Plus, Search, Package, AlertCircle } from 'lucide-react';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  categoria: string;
  stockMinimo: number;
}

const GestionIngredientes = () => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [nuevoIngrediente, setNuevoIngrediente] = useState<Partial<Ingrediente>>({
    nombre: '',
    cantidad: 0,
    unidad: 'kg',
    categoria: 'general',
    stockMinimo: 0
  });

  const categorias = [
    'general',
    'harinas',
    'azúcares',
    'lácteos',
    'frutas',
    'chocolates',
    'decoración'
  ];

  const unidades = ['kg', 'g', 'l', 'ml', 'unidad'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoId = Math.random().toString(36).substr(2, 9);
    setIngredientes([...ingredientes, { ...nuevoIngrediente, id: nuevoId } as Ingrediente]);
    setNuevoIngrediente({
      nombre: '',
      cantidad: 0,
      unidad: 'kg',
      categoria: 'general',
      stockMinimo: 0
    });
    setShowForm(false);
  };

  const ingredientesFiltrados = ingredientes.filter(ingrediente =>
    ingrediente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rose-700">
            Gestión de Ingredientes
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Plus size={20} />
            Nuevo Ingrediente
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuevo Ingrediente</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={nuevoIngrediente.nombre}
                    onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, nombre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      value={nuevoIngrediente.cantidad}
                      onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, cantidad: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidad
                    </label>
                    <select
                      value={nuevoIngrediente.unidad}
                      onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, unidad: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      {unidades.map((unidad) => (
                        <option key={unidad} value={unidad}>
                          {unidad}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={nuevoIngrediente.categoria}
                    onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, categoria: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Mínimo
                  </label>
                  <input
                    type="number"
                    value={nuevoIngrediente.stockMinimo}
                    onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, stockMinimo: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredientesFiltrados.map((ingrediente) => (
            <div
              key={ingrediente.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {ingrediente.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {ingrediente.cantidad} {ingrediente.unidad}
                  </p>
                </div>
                <Package className="text-rose-500" size={24} />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Categoría: {ingrediente.categoria}
                </p>
                <p className="text-sm text-gray-500">
                  Stock mínimo: {ingrediente.stockMinimo} {ingrediente.unidad}
                </p>
                {ingrediente.cantidad <= ingrediente.stockMinimo && (
                  <div className="flex items-center gap-2 text-amber-600 mt-2">
                    <AlertCircle size={16} />
                    <span className="text-sm">Stock bajo</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {ingredientesFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-gray-400" size={48} />
            <p className="mt-4 text-gray-500">
              No hay ingredientes registrados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionIngredientes; 