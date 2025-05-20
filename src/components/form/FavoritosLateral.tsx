"use client";

import { Trash2 } from 'lucide-react';
import Image from 'next/image';

interface FavoritosLateralProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  favoritos: any[];
  onEliminarFavorito: (id: number) => void;
}

export default function FavoritosLateral({ isOpen, setIsOpen, favoritos, onEliminarFavorito }: FavoritosLateralProps) {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Favoritos</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <Trash2 size={24} />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
              {favoritos.length === 0 ? (
                <p className="text-center text-gray-500">No tienes favoritos</p>
              ) : (
                <div className="space-y-4">
                  {favoritos.map((favorito) => (
                    <div key={favorito.id} className="flex items-center gap-4 p-2 border rounded-lg">
                      <div className="relative w-20 h-20">
                        <Image
                          src={favorito.imagen}
                          alt={favorito.nombre}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{favorito.nombre}</h3>
                        <p className="text-pink-600 font-bold">${favorito.precio}</p>
                      </div>
                      <button
                        onClick={() => onEliminarFavorito(favorito.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
} 