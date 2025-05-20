"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pastel } from '@/app/dulcesdelicias/page';

interface CarritoContextType {
  carrito: Pastel[];
  setCarrito: React.Dispatch<React.SetStateAction<Pastel[]>>;
  agregarAlCarrito: (pastel: Pastel) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, nuevaCantidad: number) => void;
  total: number;
  limpiarCarrito: () => void;
  quitarDelCarrito: (id: number, eliminarTodo?: boolean) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Pastel[]>([]);
  const [total, setTotal] = useState(0);

  const agregarAlCarrito = (pastel: Pastel) => {
    const itemExistente = carrito.find(item => item.id === pastel.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item => 
        item.id === pastel.id 
          ? { ...item, cantidad: (item.cantidad || 0) + 1 } 
          : item
      ));
    } else {
      setCarrito([...carrito, { ...pastel, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;
    
    setCarrito(carrito.map(item => 
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  const quitarDelCarrito = (id: number, eliminarTodo: boolean = false) => {
    setCarrito((prevCarrito) => {
      if (eliminarTodo) {
        return prevCarrito.filter((item) => item.id !== id);
      }
      return prevCarrito
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(0, item.cantidad - 1) }
            : item
        )
        .filter((item) => item.cantidad > 0);
    });
  };

  // Calcular total cuando cambie el carrito
  useEffect(() => {
    const nuevoTotal = carrito.reduce((sum, item) => {
      return sum + item.precio * (item.cantidad || 1);
    }, 0);
    setTotal(nuevoTotal);
  }, [carrito]);

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      setCarrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      total,
      limpiarCarrito,
      quitarDelCarrito
    }}>
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