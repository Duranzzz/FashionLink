import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 w-80">
      <div className="relative overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ${product.price.toLocaleString()}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isAdded ? (
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Añadido</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Reservar</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;