import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onAddToCart }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Pixels per frame
    
    const scroll = () => {
      scrollAmount += scrollSpeed;
      
      // Reset scroll when we've scrolled past the first set of products
      const cardWidth = 320; // width + gap
      const totalWidth = products.length * cardWidth;
      
      if (scrollAmount >= totalWidth) {
        scrollAmount = 0;
      }
      
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animation);
  }, [products.length]);

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex-shrink-0">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;