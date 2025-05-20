import Sidebar from '@/components/form/sidebar';
import { ShoppingCart } from 'lucide-react';

const products = [
  { name: 'Pastel 1', price: 0, quantity: 2 },
  { name: 'Pastel 3', price: 0, quantity: 2 },
  { name: 'Pastel 2', price: 5, quantity: 5 },
];

export default function DulcesDelicias() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar ya implementado */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center">
        <div className="container mx-auto px-4 py-12">
          {/* Encabezado */}
          <h1 className="text-xl font-semibold mb-8">3.5.1.4 - Carrito de compras</h1>

          {/* Título de sección */}
          <div className="flex items-center gap-2 text-lg font-semibold mb-6">
            <ShoppingCart className="text-pink-600" />
            <span>Carrito de compras</span>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {products.map((product, index) => (
              <div key={index} className="border rounded-xl p-4 bg-gray-50 shadow hover:shadow-md transition">
                <div className="w-full h-32 bg-gray-200 rounded mb-4" />
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-sm font-bold">${product.price}</p>
                <p className="text-xs text-gray-600">{product.quantity} unidades</p>
              </div>
            ))}
          </div>

          {/* Botón Comprar */}
          <div className="flex justify-end">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}