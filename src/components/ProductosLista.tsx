"use client";

import Image from 'next/image';
import { useCarrito } from '@/context/CarritoContext';
import type { pastel } from '@prisma/client';

interface ProductosListaProps {
  pasteles: pastel[];
  pastelesDestacados: pastel[];
}

export function ProductosLista({ pasteles, pastelesDestacados }: ProductosListaProps) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <>
      {/* Sección de Pasteles Destacados */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">Pasteles Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastelesDestacados.map((pastel) => (
            <div key={pastel.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-48">
                <Image 
                  src={pastel.imagen || '/placeholder.jpg'} 
                  alt={pastel.nombre} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pastel.nombre}</h3>
                <p className="text-gray-600 mt-2">{pastel.descripcion || ''}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-pink-600 font-bold">${Number(pastel.precio)}</span>
                  <button 
                    onClick={() => agregarAlCarrito(pastel)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Todos los Pasteles */}
      <section>
        <h2 className="text-3xl font-bold text-pink-600 mb-6">Nuestros Pasteles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pasteles.map((pastel) => (
            <div key={pastel.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-48">
                <Image 
                  src={pastel.imagen || '/placeholder.jpg'} 
                  alt={pastel.nombre} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pastel.nombre}</h3>
                <p className="text-gray-600 mt-2">{pastel.descripcion || ''}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-pink-600 font-bold">${Number(pastel.precio)}</span>
                  <button 
                    onClick={() => agregarAlCarrito(pastel)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 