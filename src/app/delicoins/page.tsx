"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/form/sidebar';
import { Gift, Star, History, ChevronRight, Clock, CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earn' | 'redeem';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

const Delicoins = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  // Datos de ejemplo
  const userData = {
    balance: 1250,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 250,
    totalEarned: 5000,
    totalRedeemed: 3750
  };

  const rewards = [
    {
      name: '10% de Descuento',
      cost: 500,
      description: 'Descuento del 10% en tu próxima compra',
      available: true
    },
    {
      name: 'Pastel Gratis',
      cost: 1000,
      description: 'Un pastel de tu elección gratis',
      available: true
    },
    {
      name: 'Box de Cupcakes',
      cost: 750,
      description: 'Box de 6 cupcakes personalizados',
      available: true
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'TRX001',
      type: 'earn',
      amount: 250,
      description: 'Compra de Pastel de Chocolate',
      date: '2024-03-15',
      status: 'completed'
    },
    {
      id: 'TRX002',
      type: 'redeem',
      amount: -500,
      description: 'Canje de 10% de descuento',
      date: '2024-03-10',
      status: 'completed'
    },
    {
      id: 'TRX003',
      type: 'earn',
      amount: 1500,
      description: 'Compra de Pastel de Bodas',
      date: '2024-03-05',
      status: 'completed'
    }
  ];

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-rose-700">
              Mis Delicoins
            </h1>
            <div className="flex items-center gap-2">
              <Gift className="text-rose-500" size={24} />
              <span className="text-2xl font-bold text-rose-600">
                {userData.balance}
              </span>
            </div>
          </div>

          {/* Nivel de Fidelidad */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Nivel {userData.level}
                </h2>
                <p className="text-rose-100">
                  {userData.pointsToNextLevel} Delicoins para alcanzar {userData.nextLevel}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {userData.totalEarned}
                </p>
                <p className="text-rose-100">
                  Total ganado
                </p>
              </div>
            </div>
            <div className="mt-4 w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2"
                style={{ width: `${(userData.balance / (userData.balance + userData.pointsToNextLevel)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'overview'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Recompensas
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'history'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Historial
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {reward.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {reward.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-rose-600 font-semibold">
                      <Gift size={20} />
                      {reward.cost}
                    </div>
                  </div>
                  <button
                    className={`w-full py-2 rounded-lg font-medium ${
                      userData.balance >= reward.cost
                        ? 'bg-rose-600 text-white hover:bg-rose-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={userData.balance < reward.cost}
                  >
                    Canjear
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Historial de Transacciones
                </h2>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'earn' ? 'bg-green-100' : 'bg-rose-100'
                        }`}>
                          {transaction.type === 'earn' ? (
                            <Star className="w-5 h-5 text-green-600" />
                          ) : (
                            <Gift className="w-5 h-5 text-rose-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-semibold ${
                          transaction.type === 'earn' ? 'text-green-600' : 'text-rose-600'
                        }`}>
                          {transaction.type === 'earn' ? '+' : ''}{transaction.amount}
                        </span>
                        {transaction.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Información Adicional */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ¿Cómo funcionan los Delicoins?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Star className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Gana Puntos
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gana 1 Delicoin por cada $1 gastado en tus compras
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Gift className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Canjea Recompensas
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Usa tus Delicoins para obtener descuentos y productos gratis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <ChevronRight className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    Sube de Nivel
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Acumula más puntos para alcanzar niveles superiores con mejores beneficios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delicoins; 