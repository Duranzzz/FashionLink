import React from 'react';
import { ShoppingCart, Settings, Info } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  onInfoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onAdminClick, onInfoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FLO</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">FashionLink</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onInfoClick}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Info className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onAdminClick}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;