"use client";

import React from 'react';
import Sidebar from '@/components/form/sidebar';
import { ClipboardList, Package, FileEdit, BarChart3, Gift, Star } from 'lucide-react';
import Link from 'next/link';

const AdminDashboard = () => {
  const adminModules = [
    {
      title: 'Pedidos y Ventas',
      description: 'Gestiona los pedidos y ventas de la pastelería',
      icon: ClipboardList,
      href: '/admin/orders',
      color: 'bg-blue-500'
    },
    {
      title: 'Inventario',
      description: 'Controla el inventario de ingredientes y productos',
      icon: Package,
      href: '/inventario/ingredientes',
      color: 'bg-green-500'
    },
    {
      title: 'Gestión de Contenido',
      description: 'Administra el contenido del sitio web',
      icon: FileEdit,
      href: '/admin/gestion-contenido',
      color: 'bg-purple-500'
    },
    {
      title: 'Estadísticas',
      description: 'Visualiza estadísticas y reportes',
      icon: BarChart3,
      href: '/admin/stats',
      color: 'bg-orange-500'
    },
    {
      title: 'Ofertas y Descuentos',
      description: 'Gestiona ofertas especiales y códigos de descuento',
      icon: Gift,
      href: '/admin/ofertas',
      color: 'bg-pink-500'
    },
    {
      title: 'Delicoins',
      description: 'Configura el programa de fidelidad y recompensas',
      icon: Star,
      href: '/admin/delicoins',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-rose-700 mb-8">
          🎂 Panel de Administración
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {adminModules.map((module, index) => (
            <Link 
              key={index} 
              href={module.href}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`${module.color} p-4`}>
                  <module.icon className="w-8 h-8 text-white" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {module.title}
                  </h2>
                  <p className="text-gray-600">
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Acceso Rápido
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adminModules.map((module, index) => (
              <Link
                key={index}
                href={module.href}
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <module.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{module.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 