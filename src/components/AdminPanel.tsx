import React, { useState } from 'react';
import { X, Plus, Trash2, User, Lock } from 'lucide-react';
import { Product } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
  isLoggedIn: boolean;
  onLogin: (status: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  isLoggedIn,
  onLogin
}) => {
  const [password, setPassword] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: 'polos'
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, this would be more secure
    if (password === 'admin123') {
      onLogin(true);
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image) {
      onAddProduct({
        name: newProduct.name,
        price: parseInt(newProduct.price),
        image: newProduct.image,
        category: newProduct.category
      });
      setNewProduct({ name: '', price: '', image: '', category: 'polos' });
    }
  };

  const handleLogout = () => {
    onLogin(false);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span>Panel Administrativo</span>
            </h2>
            <div className="flex items-center space-x-2">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Cerrar Sesión
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!isLoggedIn ? (
              /* Login Form */
              <div className="max-w-md mx-auto mt-16">
                <div className="text-center mb-8">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Acceso Restringido</h3>
                  <p className="text-gray-600">Ingresa la contraseña para acceder al panel</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Iniciar Sesión
                  </button>
                </form>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 text-center">
                    💡 <strong>Para este demo:</strong> usa la contraseña "admin123"
                  </p>
                </div>
              </div>
            ) : (
              /* Admin Content */
              <div className="max-w-4xl mx-auto">
                {/* Add Product Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Agregar Nuevo Producto</span>
                  </h3>
                  
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del Producto
                        </label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                          placeholder="Ej: Polo Clásico Blanco"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Precio (COP)
                        </label>
                        <input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                          placeholder="25000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="polos">Polos</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="ropa-invierno">Ropa de Invierno</option>
                        <option value="ropa-interior">Ropa Interior</option>
                        <option value="camisas">Camisas</option>
                        <option value="variados">Variados</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL de la Imagen
                      </label>
                      <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="https://images.pexels.com/..."
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Agregar Producto</span>
                    </button>
                  </form>
                </div>

                {/* Products List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Productos Existentes ({products.length})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                      <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
                            {product.name}
                          </h4>
                          <p className="text-purple-600 font-semibold text-sm mb-2">
                            ${product.price.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 capitalize">
                              {product.category}
                            </span>
                            <button
                              onClick={() => onDeleteProduct(product.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;