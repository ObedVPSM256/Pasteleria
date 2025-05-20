"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/form/sidebar';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Ayuda() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqs = [
    {
      question: '¿Cómo puedo realizar un pedido?',
      answer: 'Puedes realizar un pedido a través de nuestra página web seleccionando los productos deseados y siguiendo el proceso de compra. También puedes contactarnos por teléfono o visitar nuestra tienda física.'
    },
    {
      question: '¿Cuánto tiempo de anticipación debo hacer mi pedido?',
      answer: 'Recomendamos hacer los pedidos con al menos 48 horas de anticipación para pasteles estándar. Para diseños personalizados, sugerimos un mínimo de 72 horas.'
    },
    {
      question: '¿Cómo funciona el programa de fidelidad Delicoins?',
      answer: 'Por cada compra, acumulas Delicoins que puedes canjear por descuentos en futuras compras. 1 Delicoin equivale a $1 de descuento.'
    },
    {
      question: '¿Realizan entregas a domicilio?',
      answer: 'Sí, realizamos entregas a domicilio en un radio de 10km de nuestra ubicación. El costo de envío varía según la distancia.'
    },
    {
      question: '¿Puedo personalizar mi pastel?',
      answer: '¡Por supuesto! Ofrecemos opciones de personalización en diseño, sabores y decoraciones. Puedes consultar nuestras opciones en la sección de pasteles personalizados.'
    }
  ];

  const supportChannels = [
    {
      icon: Phone,
      title: 'Llamada Telefónica',
      description: 'Lunes a Sábado de 9:00 AM a 8:00 PM',
      contact: '+52 123 456 7890'
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      description: 'Respuesta en 24 horas',
      contact: 'soporte@dulcesdelicias.com'
    },
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Disponible en horario de atención',
      contact: 'Iniciar chat'
    }
  ];

  return (
    <div className="flex min-h-screen bg-rose-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-rose-700 mb-8">
            Centro de Ayuda
          </h1>

          {/* Preguntas Frecuentes */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenSection(openSection === `faq-${index}` ? null : `faq-${index}`)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`transform transition-transform ${
                        openSection === `faq-${index}` ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                  {openSection === `faq-${index}` && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Canales de Soporte */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Canales de Soporte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:border-rose-500 transition-colors"
                >
                  <channel.icon className="w-8 h-8 text-rose-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {channel.description}
                  </p>
                  <p className="text-rose-600 font-medium">
                    {channel.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de Ayuda Adicional */}
          <div className="mt-8 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4">
              <HelpCircle size={48} className="text-white opacity-80" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  ¿No encontraste lo que buscabas?
                </h2>
                <p className="mb-4">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta adicional.
                </p>
                <button className="bg-white text-rose-600 px-6 py-2 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
                  Contactar Soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 