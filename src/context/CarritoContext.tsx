"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface Pastel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  destacado: boolean;
  etiquetas: string[];
  calificacion: number;
  cantidad?: number;
}

interface CarritoContextType {
  carrito: Pastel[];
  agregarAlCarrito: (pastel: Pastel) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  limpiarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Pastel[]>([]);

  const agregarAlCarrito = (pastel: Pastel) => {
    setCarrito((prevCarrito) => {
      const pastelExistente = prevCarrito.find((item) => item.id === pastel.id);
      if (pastelExistente) {
        return prevCarrito.map((item) =>
          item.id === pastel.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...pastel, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
} 