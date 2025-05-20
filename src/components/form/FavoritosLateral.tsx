"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { Pastel } from '@/app/dulcesdelicias/page';
import { useCarrito } from '@/context/CarritoContext';

interface FavoritosLateralProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  favoritos: Pastel[];
  onEliminarFavorito: (id: number) => void;
}

export default function FavoritosLateral({ 
  isOpen, 
  setIsOpen, 
  favoritos,
  onEliminarFavorito 
}: FavoritosLateralProps) {
  const { agregarAlCarrito } = useCarrito();
  
  // Si el panel no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 flex flex-col">
      {/* Encabezado del panel */}
      <div className="px-4 py-3 bg-rose-50 flex justify-between items-center border-b border-rose-100">
        <div className="flex items-center gap-2 text-rose-700">
          <Heart size={20} className="fill-current" />
          <h2 className="font-semibold text-lg">Tus Favoritos</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-rose-500 hover:text-rose-700"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Contenido del panel */}
      <div className="flex-grow overflow-y-auto p-4">
        {favoritos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-rose-50 p-6 rounded-full mb-4">
              <Heart size={32} className="text-rose-300" />
            </div>
            <h3 className="font-medium text-lg text-rose-900 mb-2">No tienes favoritos aún</h3>
            <p className="text-gray-500 mb-6">
              Guarda tus pasteles favoritos para encontrarlos fácilmente más tarde.
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              Explorar Pasteles
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {favoritos.map((pastel) => (
                <li key={pastel.id} className="flex gap-3 pb-4 border-b border-gray-100">
                  {/* Imagen miniatura */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      width={80}
                      height={80} 
                      src={pastel.imagen} 
                      alt={pastel.nombre} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Detalles del producto */}
                  <div className="flex-grow">
                    <h4 className="font-medium text-rose-900">{pastel.nombre}</h4>
                    <p className="text-rose-600 font-semibold">${pastel.precio}</p>
                    
                    {/* Botones de acción */}
                    <div className="flex items-center mt-2 gap-2">
                      <button 
                        onClick={() => agregarAlCarrito(pastel)}
                        className="flex items-center gap-1 bg-pink-600 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-700 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        Agregar
                      </button>
                      
                      <button 
                        onClick={() => onEliminarFavorito(pastel.id)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Resumen */}
            <div className="mt-6 bg-rose-50 p-4 rounded-lg">
              <p className="text-gray-600 text-center">
                {favoritos.length} {favoritos.length === 1 ? 'pastel' : 'pasteles'} guardados
              </p>
            </div>
          </>
        )}
      </div>
      
      {/* Pie del panel */}
      {favoritos.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-full font-medium hover:shadow-lg transition-all"
          >
            Ver Catálogo Completo
          </button>
        </div>
      )}
    </div>
  );
} 