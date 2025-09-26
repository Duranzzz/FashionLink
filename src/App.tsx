import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Trash2, User, Settings, X, Apple as WhatsApp, Info } from 'lucide-react';
import Header from './components/Header';
import CategorySection from './components/CategorySection';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import CheckoutForm from './components/CheckoutForm';
import InfoModal from './components/InfoModal';
import { Product, CartItem, Category } from './types';

// Sample initial data
const initialProducts: Product[] = [
  // Polos
  { id: '1', name: 'Polo Clásico Blanco', price: 25000, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', category: 'polos' },
  { id: '2', name: 'Polo Azul Marino', price: 28000, image: 'https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg', category: 'polos' },
  { id: '3', name: 'Polo Negro Elegante', price: 30000, image: 'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg', category: 'polos' },
  { id: '4', name: 'Polo Gris Moderno', price: 27000, image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg', category: 'polos' },
  
  // Pantalones
  { id: '5', name: 'Jeans Clásicos', price: 45000, image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg', category: 'pantalones' },
  { id: '6', name: 'Chinos Beige', price: 40000, image: 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg', category: 'pantalones' },
  { id: '7', name: 'Pantalón Deportivo', price: 35000, image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg', category: 'pantalones' },
  { id: '8', name: 'Jeans Oscuros', price: 48000, image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg', category: 'pantalones' },
  
  // Ropa de Invierno
  { id: '9', name: 'Chaqueta Térmica', price: 85000, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg', category: 'ropa-invierno' },
  { id: '10', name: 'Suéter Lana', price: 55000, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', category: 'ropa-invierno' },
  { id: '11', name: 'Abrigo Elegante', price: 120000, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', category: 'ropa-invierno' },
  { id: '12', name: 'Hoodie Cómodo', price: 45000, image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg', category: 'ropa-invierno' },
  
  // Ropa Interior
  { id: '13', name: 'Pack Boxers Premium', price: 35000, image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg', category: 'ropa-interior' },
  { id: '14', name: 'Camisetas Interiores', price: 25000, image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg', category: 'ropa-interior' },
  { id: '15', name: 'Calcetines Deportivos', price: 15000, image: 'https://images.pexels.com/photos/7679659/pexels-photo-7679659.jpeg', category: 'ropa-interior' },
  { id: '16', name: 'Ropa Interior Térmica', price: 40000, image: 'https://images.pexels.com/photos/7679661/pexels-photo-7679661.jpeg', category: 'ropa-interior' },
  
  // Camisas
  { id: '17', name: 'Camisa Formal Blanca', price: 50000, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', category: 'camisas' },
  { id: '18', name: 'Camisa Casual Azul', price: 42000, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', category: 'camisas' },
  { id: '19', name: 'Camisa a Cuadros', price: 38000, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg', category: 'camisas' },
  { id: '20', name: 'Camisa Lino Verano', price: 45000, image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg', category: 'camisas' },
  
  // Variados
  { id: '21', name: 'Gorra Snapback', price: 18000, image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg', category: 'variados' },
  { id: '22', name: 'Reloj Deportivo', price: 65000, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', category: 'variados' },
  { id: '23', name: 'Cinturón Cuero', price: 22000, image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg', category: 'variados' },
  { id: '24', name: 'Gafas de Sol', price: 32000, image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg', category: 'variados' },
  { id: '25', name: 'Mochila Urbana', price: 55000, image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg', category: 'variados' },
  { id: '26', name: 'Zapatillas Deportivas', price: 75000, image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg', category: 'variados' }
];

const categories: Category[] = [
  { id: 'polos', name: 'Polos', description: 'Polos cómodos y elegantes para cualquier ocasión' },
  { id: 'pantalones', name: 'Pantalones', description: 'Pantalones de alta calidad y diseño moderno' },
  { id: 'ropa-invierno', name: 'Ropa de Invierno', description: 'Mantente abrigado con estilo durante el invierno' },
  { id: 'ropa-interior', name: 'Ropa Interior', description: 'Comodidad y calidad en ropa interior premium' },
  { id: 'camisas', name: 'Camisas', description: 'Camisas elegantes para toda ocasión' },
  { id: 'variados', name: 'Variados', description: 'Una selección especial de productos únicos' }
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (customerInfo: { name: string; phone: string; notes: string }) => {
    const orderDetails = cart.map(item => 
      `${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toLocaleString()}`
    ).join('%0A');
    
    const total = getTotalPrice();
    const message = `¡Hola! Me interesa reservar los siguientes productos:%0A%0A${orderDetails}%0A%0ATotal: $${total.toLocaleString()}%0A%0ANombre: ${customerInfo.name}%0ATeléfono: ${customerInfo.phone}%0A${customerInfo.notes ? `Notas: ${customerInfo.notes}%0A` : ''}%0A¡Gracias!`;
    
    window.open(`https://wa.me/57YOUR_PHONE_NUMBER?text=${message}`, '_blank');
    
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
        onInfoClick={() => setIsInfoOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Fashion<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Link</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Tu tienda virtual que nunca cierra. Descubre moda de calidad y reserva fácilmente.
          </p>
          <div className="animate-bounce">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categories.map(category => (
          <CategorySection
            key={category.id}
            category={category}
            products={products.filter(p => p.category === category.id)}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={addProduct}
        onDeleteProduct={deleteProduct}
        isLoggedIn={isAdminLoggedIn}
        onLogin={setIsAdminLoggedIn}
      />

      {/* Checkout Form */}
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        totalPrice={getTotalPrice()}
        onSubmit={handleOrderComplete}
      />
      {/* Info Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>	
  );
}

export default App;