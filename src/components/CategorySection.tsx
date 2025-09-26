import React from 'react';
import ProductCarousel from './ProductCarousel';
import { Category, Product } from '../types';

interface CategorySectionProps {
  category: Category;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, products, onAddToCart }) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 capitalize">
          {category.name}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {category.description}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
      </div>
      
      <ProductCarousel products={products} onAddToCart={onAddToCart} />
    </section>
  );
};

export default CategorySection;