"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Heart, Clock, Award } from 'lucide-react';
import { pastelService } from '@/services/pastelService';
import { CarritoLateral } from '@/components/CarritoLateral';
import { CheckoutForm } from '@/components/CheckoutForm';
import { CarritoProvider } from '@/context/CarritoContext';

export default async function Home() {
  const pasteles = await pastelService.getAllPasteles();
  const pastelesDestacados = await pastelService.getPastelesDestacados();

  return (
    <CarritoProvider>
      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Sección de Pasteles Destacados */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">Pasteles Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastelesDestacados.map((pastel) => (
                <div key={pastel.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src={pastel.imagen} alt={pastel.nombre} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{pastel.nombre}</h3>
                    <p className="text-gray-600 mt-2">{pastel.descripcion}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-pink-600 font-bold">${pastel.precio}</span>
                      <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors">
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
                  <img src={pastel.imagen} alt={pastel.nombre} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{pastel.nombre}</h3>
                    <p className="text-gray-600 mt-2">{pastel.descripcion}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-pink-600 font-bold">${pastel.precio}</span>
                      <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors">
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <CarritoLateral />
      </main>
    </CarritoProvider>
  );
}