"use client";

import React from 'react';
import Sidebar from '@/components/form/sidebar';
import { DollarSign, ShoppingCart, Users, Package, Star } from 'lucide-react';

const Estadisticas = () => {
  // Datos de ejemplo
  const metrics = [
    {
      title: 'Ventas Totales',
      value: '$45,250.00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      value: '156',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Clientes',
      value: '89',
      change: '+5.7%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Productos Vendidos',
      value: '234',
      change: '+15.3%',
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  const topProducts = [
    { name: 'Pastel de Chocolate', sales: 45, revenue: 20250 },
    { name: 'Red Velvet', sales: 38, revenue: 19000 },
    { name: 'Tres Leches', sales: 32, revenue: 12800 },
    { name: 'Cupcakes (6)', sales: 28, revenue: 9800 }
  ];

  const recentActivity = [
    { type: 'venta', description: 'Nueva venta de Pastel de Chocolate', amount: 450, time: '5 min' },
    { type: 'pedido', description: 'Pedido personalizado de Red Velvet', amount: 800, time: '15 min' },
    { type: 'cliente', description: 'Nuevo cliente registrado', time: '30 min' },
    { type: 'review', description: 'Nueva reseña de 5 estrellas', time: '1 hora' }
  ];

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-rose-700">
              Estadísticas
            </h1>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
                <option>Últimos 90 días</option>
                <option>Este año</option>
              </select>
              <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors">
                Exportar
              </button>
            </div>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm mb-1">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Productos Más Vendidos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Productos Más Vendidos
              </h2>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.sales} ventas
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${product.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ingresos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Actividad Reciente
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'venta' ? 'bg-green-100' :
                      activity.type === 'pedido' ? 'bg-blue-100' :
                      activity.type === 'cliente' ? 'bg-purple-100' :
                      'bg-yellow-100'
                    }`}>
                      {activity.type === 'venta' && <DollarSign className="w-5 h-5 text-green-600" />}
                      {activity.type === 'pedido' && <ShoppingCart className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'cliente' && <Users className="w-5 h-5 text-purple-600" />}
                      {activity.type === 'review' && <Star className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">
                        {activity.description}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        {activity.amount && (
                          <span className="text-sm font-medium text-gray-600">
                            ${activity.amount}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          Hace {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gráficos (placeholder) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Ventas por Día
              </h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de ventas</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Distribución de Ventas
              </h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de distribución</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas; 