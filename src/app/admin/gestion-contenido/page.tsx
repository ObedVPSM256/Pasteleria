"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/form/sidebar';
import { Plus, Edit, Trash2, Tag, Layers, ListTree, Cake } from 'lucide-react';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('categories');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentItem, setCurrentItem] = useState<ModalItem | null>(null);

  // Datos de ejemplo
  const [categories, setCategories] = useState([
    { id: 1, nombre: 'Tamaño', descripcion: 'Tortas decoradas', color: '#f472b6' },
    { id: 2, nombre: 'Sabor', descripcion: 'Pequeños pasteles individuales', color: '#60a5fa' },
  ]);

  const [subcategories, setSubcategories] = useState([
    { id: 1, fk_categoria: 1, nombre: 'Pequeño', detalles: 'Para 5 personas', precio_adicional: 50, color: '#f472b6' },
    { id: 2, fk_categoria: 2, nombre: 'Chocolate', detalles: 'Sabor de chocolate', precio_adicional: 100, color: '#f472b6' },
  ]);

  const [tags, setTags] = useState([
    { id: 1, nombre: 'Chocolate', color: '#f59e0b' },
    { id: 2, nombre: 'Fresa', color: '#10b981' },
    { id: 3, nombre: 'Vainilla', color: '#93c5fd' },
    { id: 4, nombre: 'Frutos Rojos', color: '#ec4899' },
  ]);

  const [pasteles, setPasteles] = useState([
    { 
      id: 1, 
      nombre: 'Pastel de Chocolate', 
      descripcion: 'Delicioso pastel de chocolate con relleno de trufa',
      precio: 450.00,
      imagen: '/pasteles/chocolate.jpg',
      destacado: true,
      stock: 5,
      disponible: true,
      fecha_creacion: '2025-04-15T10:30:00',
      etiquetas: [1, 3] // IDs de las etiquetas asociadas
    },
    { 
      id: 2, 
      nombre: 'Pastel de Fresa', 
      descripcion: 'Pastel con base de vainilla y relleno de fresas naturales',
      precio: 380.00,
      imagen: '/pasteles/fresa.jpg',
      destacado: false,
      stock: 3,
      disponible: true,
      fecha_creacion: '2025-04-10T14:25:00',
      etiquetas: [2, 4] // IDs de las etiquetas asociadas
    }
  ]);

  type Category = { id: number; nombre: string; descripcion: string; color: string };
  type Subcategory = { id: number; fk_categoria: number; nombre: string; detalles: string; precio_adicional: number; color: string };
  type TagType = { id: number; nombre: string; color: string };
  type Pastel = { 
    id: number; 
    nombre: string; 
    descripcion: string; 
    precio: number; 
    imagen: string; 
    destacado: boolean; 
    stock: number; 
    disponible: boolean; 
    fecha_creacion: string; 
    etiquetas: number[] 
  };
  type ModalItem = Category | Subcategory | TagType | Pastel | { [key: string]: unknown };

  const handleOpenModal = (
    type: 'create' | 'edit',
    item?: ModalItem
  ) => {
    setModalType(type);
    setCurrentItem(item ? {...item} : {
      etiquetas: []
    });
    setShowModal(true);
  };

  const handleDelete = (id: number, type: 'category' | 'subcategory' | 'tag' | 'pastel') => {
    switch(type) {
      case 'category':
        setCategories(categories.filter(cat => cat.id !== id));
        break;
      case 'subcategory':
        setSubcategories(subcategories.filter(subcat => subcat.id !== id));
        break;
      case 'tag':
        setTags(tags.filter(tag => tag.id !== id));
        break;
      case 'pastel':
        setPasteles(pasteles.filter(pastel => pastel.id !== id));
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (modalType === 'create') {
      const newId = Math.max(...(activeTab === 'categories' 
        ? categories.map(i => i.id) 
        : activeTab === 'subcategories' 
          ? subcategories.map(i => i.id)
          : activeTab === 'tags'
            ? tags.map(i => i.id)
            : pasteles.map(i => i.id)), 0) + 1;
      
      const newItem = { ...currentItem, id: newId };
      
      if (activeTab === 'categories') {
        setCategories([
          ...categories,
          {
            id: newItem.id,
            nombre: (newItem as Category).nombre || '',
            descripcion: (newItem as Category).descripcion || '',
            color: (newItem as Category).color || '#f472b6'
          }
        ]);
      } else if (activeTab === 'subcategories') {
        setSubcategories([
          ...subcategories,
          {
            id: newItem.id,
            fk_categoria: (newItem as Subcategory).fk_categoria || 0,
            nombre: (newItem as Subcategory).nombre || '',
            detalles: (newItem as Subcategory).detalles || '',
            precio_adicional: (newItem as Subcategory).precio_adicional || 0,
            color: (newItem as Subcategory).color || '#f472b6'
          }
        ]);
      } else if (activeTab === 'tags') {
        setTags([
          ...tags,
          {
            id: newItem.id,
            nombre: (newItem as TagType).nombre || '',
            color: (newItem as TagType).color || '#f472b6'
          }
        ]);
      } else if (activeTab === 'pasteles') {
        setPasteles([
          ...pasteles,
          {
            id: newItem.id,
            nombre: (newItem as Pastel).nombre || '',
            descripcion: (newItem as Pastel).descripcion || '',
            precio: (newItem as Pastel).precio || 0,
            imagen: (newItem as Pastel).imagen || '',
            destacado: (newItem as Pastel).destacado || false,
            stock: (newItem as Pastel).stock || 0,
            disponible: (newItem as Pastel).disponible ?? true,
            fecha_creacion: new Date().toISOString(),
            etiquetas: (newItem as Pastel).etiquetas || []
          }
        ]);
      }
    } else if (modalType === 'edit') {
      if (activeTab === 'categories') {
        if (currentItem) {
          setCategories(categories.map(item => item.id === (currentItem as Category).id ? currentItem as Category : item));
        }
      } else if (activeTab === 'subcategories') {
        if (currentItem) {
          setSubcategories(subcategories.map(item => item.id === (currentItem as Subcategory).id ? currentItem as Subcategory : item));
        }
      } else if (activeTab === 'tags') {
        if (currentItem && 'id' in currentItem && 'nombre' in currentItem && 'color' in currentItem) {
          setTags(tags.map(item => item.id === currentItem.id ? currentItem as TagType : item));
        }
      } else if (activeTab === 'pasteles') {
        if (currentItem && 'id' in currentItem && 'nombre' in currentItem && 'descripcion' in currentItem && 'precio' in currentItem && 'imagen' in currentItem && 'destacado' in currentItem && 'stock' in currentItem && 'disponible' in currentItem && 'fecha_creacion' in currentItem && 'etiquetas' in currentItem) {
          setPasteles(pasteles.map(item =>
                      item.id === currentItem.id
                        ? {
                            id: Number(currentItem.id),
                            nombre: String(currentItem.nombre ?? ''),
                            descripcion: String(currentItem.descripcion ?? ''),
                            precio: Number(currentItem.precio ?? 0),
                            imagen: String(currentItem.imagen ?? ''),
                            destacado: Boolean(currentItem.destacado),
                            stock: Number(currentItem.stock ?? 0),
                            disponible: Boolean(currentItem.disponible),
                            fecha_creacion: String(currentItem.fecha_creacion ?? new Date().toISOString()),
                            etiquetas: Array.isArray(currentItem.etiquetas) ? currentItem.etiquetas.map(Number) : []
                          }
                        : item
                    ));
        }
      }
    }
    
    setShowModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  const getTagNames = (tagIds: number[]) => {
    return tagIds.map(id => {
      const tag = tags.find(t => t.id === id);
      return tag ? tag.nombre : '';
    }).filter(name => name !== '');
  };

  return (
    <div className='flex min-h-screen bg-rose-50'>
      <Sidebar />
      <div className='flex-1 h-52'>
        <div className='mx-auto p-4 '>
        <div className="">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-bold">Gestión de Contenido</h1>
        </div>
        
        {/* Pestañas */}
        <div className="bg-white border-b border-gray-200 rounded-b-xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'categories'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-500 hover:text-rose-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers size={16} />
                  <span>Categorías</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('subcategories')}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'subcategories'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-500 hover:text-rose-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ListTree size={16} />
                  <span>Subcategorías</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('tags')}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'tags'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-500 hover:text-rose-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>Etiquetas</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('pasteles')}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'pasteles'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-500 hover:text-rose-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cake size={16} />
                  <span>Pasteles</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Botón de agregar */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">
                {activeTab === 'categories' ? 'Categorías' : 
                 activeTab === 'subcategories' ? 'Subcategorías' : 
                 activeTab === 'tags' ? 'Etiquetas' : 'Pasteles'}
              </h2>
              <button
                onClick={() => handleOpenModal('create')}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm transition duration-200"
              >
                <Plus size={16} />
                Agregar {activeTab === 'categories' ? 'Categoría' : 
                        activeTab === 'subcategories' ? 'Subcategoría' : 
                        activeTab === 'tags' ? 'Etiqueta' : 'Pastel'}
              </button>
            </div>
            
            {/* Tablas */}
            {activeTab === 'categories' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{category.nombre}</td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{category.descripcion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-300" 
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-xs text-gray-500">{category.color}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal('edit', category)}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(category.id, 'category')}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No hay categorías disponibles. Haga clic en &quot;Agregar Categoría&quot; para crear una nueva.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'subcategories' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subcategories.map((subcat) => (
                      <tr key={subcat.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{subcat.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {categories.find(c => c.id === subcat.fk_categoria)?.nombre || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{subcat.detalles}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">${subcat.precio_adicional.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal('edit', subcat)}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(subcat.id, 'subcategory')}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {subcategories.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No hay subcategorías disponibles. Haga clic en &quot;Agregar Subcategoría&quot; para crear una nueva.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'tags' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tags.map((tag) => (
                      <tr key={tag.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{tag.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-300" 
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="text-xs text-gray-500">{tag.color}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal('edit', tag)}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id, 'tag')}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {tags.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                          No hay etiquetas disponibles. Haga clic en &quot;Agregar Etiqueta&quot; para crear una nueva.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'pasteles' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etiquetas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destacado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pasteles.map((pastel) => (
                      <tr key={pastel.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{pastel.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">${pastel.precio.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {pastel.etiquetas && getTagNames(pastel.etiquetas).map((tagName, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tagName}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{pastel.stock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                            pastel.destacado ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {pastel.destacado ? 'Sí' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                            pastel.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {pastel.disponible ? 'Sí' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                          {formatDate(pastel.fecha_creacion)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleOpenModal('edit', pastel)}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <Edit size={14} /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(pastel.id, 'pastel')}
                              className="flex items-center gap-1 text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {pasteles.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                          No hay pasteles disponibles. Haga clic en &quot;Agregar Pastel&quot; para crear uno nuevo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {modalType === 'create' 
                    ? `Agregar ${activeTab === 'categories' ? 'Categoría' : activeTab === 'subcategories' ? 'Subcategoría' : activeTab === 'tags' ? 'Etiqueta' : 'Pastel'}`
                    : `Editar ${activeTab === 'categories' ? 'Categoría' : activeTab === 'subcategories' ? 'Subcategoría' : activeTab === 'tags' ? 'Etiqueta' : 'Pastel'}`}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={currentItem?.nombre !== undefined ? String(currentItem.nombre) : ''}
                        onChange={(e) => setCurrentItem({...currentItem, nombre: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                        required
                      />
                    </div>
                    
                    {(activeTab === 'categories' || activeTab === 'pasteles') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={'descripcion' in (currentItem ?? {}) ? String((currentItem as Category | Pastel).descripcion ?? '') : ''}
                          onChange={(e) => setCurrentItem({...currentItem, descripcion: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    {activeTab === 'subcategories' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Detalles</label>
                          <textarea
                            value={'detalles' in (currentItem ?? {}) ? String((currentItem as Subcategory).detalles ?? '') : ''}
                            onChange={(e) => setCurrentItem({...currentItem, detalles: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            rows={2}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                          <select
                            value={activeTab === 'subcategories' && currentItem && 'fk_categoria' in currentItem ? String(currentItem.fk_categoria ?? '') : ''}
                            onChange={(e) => setCurrentItem({
                              ...currentItem, 
                              fk_categoria: parseInt(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            required
                          >
                            <option value="">Seleccione una categoría</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Precio Adicional</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <input
                              type="number"
                              value={'precio_adicional' in (currentItem ?? {}) ? Number((currentItem as Subcategory).precio_adicional ?? 0) : 0}
                              onChange={(e) => setCurrentItem({
                                ...currentItem, 
                                precio_adicional: parseFloat(e.target.value)
                              })}
                              className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                              step="0.01"
                              min="0"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'pasteles' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <input
                              type="number"
                              value={('precio' in (currentItem ?? {})) ? Number((currentItem as Pastel).precio ?? 0) : 0}
                              onChange={(e) => setCurrentItem({
                                ...currentItem, 
                                precio: parseFloat(e.target.value)
                              })}
                              className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                              step="0.01"
                              min="0"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                          <input
                            type="number"
                            value={('stock' in (currentItem ?? {})) ? Number((currentItem as Pastel).stock ?? 0) : 0}
                            onChange={(e) => setCurrentItem({
                              ...currentItem, 
                              stock: parseInt(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            min="0"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas</label>
                          <select
                            multiple
                            value={activeTab === 'pasteles' && currentItem && 'etiquetas' in currentItem ? (currentItem.etiquetas as number[]).map(String) : []}
                            onChange={(e) => {
                              const options = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                              setCurrentItem({
                                ...currentItem,
                                etiquetas: options
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 h-auto"
                          >
                            {tags.map(tag => (
                              <option key={tag.id} value={tag.id}>
                                {tag.nombre}
                              </option>
                            ))}
                          </select>
                          <p className="mt-1 text-xs text-gray-500">Mantén presionado Ctrl (Windows) o Command (Mac) para seleccionar múltiples opciones.</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="destacado"
                              checked={('destacado' in (currentItem ?? {})) ? Boolean((currentItem as Pastel).destacado) : false}
                              onChange={(e) => setCurrentItem({
                                ...currentItem,
                                destacado: e.target.checked
                              })}
                              className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                            />
                            <label htmlFor="destacado" className="ml-2 block text-sm text-gray-700">
                              Destacado
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="disponible"
                              checked={activeTab === 'pasteles' && currentItem && 'disponible' in currentItem ? Boolean(currentItem.disponible) : false}
                              onChange={(e) => setCurrentItem({
                                ...currentItem,
                                ...(activeTab === 'pasteles' ? { disponible: e.target.checked } : {})
                              })}
                              className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                            />
                            <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
                              Disponible
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                          <input
                            type="text"
                            value={('imagen' in (currentItem ?? {})) ? String((currentItem as Pastel).imagen ?? '') : ''}
                            onChange={(e) => setCurrentItem({...currentItem, imagen: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="/pasteles/imagen.jpg"
                          />
                        </div>
                      </>
                    )}
                    
                    {(activeTab === 'categories' || activeTab === 'subcategories' || activeTab === 'tags') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={currentItem && 'color' in currentItem ? currentItem.color as string : '#f472b6'}
                            onChange={(e) => setCurrentItem({...currentItem, color: e.target.value})}
                            className="w-10 h-10 rounded-md border border-gray-300"
                          />
                          <input
                            type="text"
                            value={currentItem && 'color' in currentItem ? currentItem.color as string : '#f472b6'}
                            onChange={(e) => setCurrentItem({...currentItem, color: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                            placeholder="#f472b6"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                      {modalType === 'create' ? 'Crear' : 'Guardar cambios'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

        </div>

      </div>
      
    </div>
  );
}