import React from 'react';
import { X, Heart, Star, Users, Truck } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FL</span>
              </div>
              <span>Acerca de FashionLink</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero Section */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">FashionLink</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Tu tienda virtual de moda que nunca cierra. Conectamos estilo, calidad y comodidad 
                  en una experiencia de compra única y personalizada.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Nuestra Misión</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Democratizar la moda de calidad, haciendo que el estilo sea accesible para todos 
                    a través de una plataforma digital innovadora y fácil de usar.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Calidad Premium</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Seleccionamos cuidadosamente cada prenda para garantizar la mejor calidad, 
                    durabilidad y diseño en cada producto de nuestro catálogo.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Atención Personal</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Cada cliente es único. Por eso ofrecemos atención personalizada a través de 
                    WhatsApp para resolver dudas y coordinar entregas.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Entrega Flexible</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Coordinamos contigo el mejor punto de encuentro y horario para la entrega, 
                    adaptándonos a tu comodidad y disponibilidad.
                  </p>
                </div>
              </div>

              {/* Story Section */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nuestra Historia</h4>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    FashionLink nació de la idea de crear un puente entre la moda de calidad y las personas 
                    que buscan expresar su estilo único. Comenzamos como un pequeño emprendimiento con la 
                    visión de revolucionar la forma en que las personas compran ropa.
                  </p>
                  <p>
                    Hoy, somos más que una tienda virtual: somos una comunidad de amantes de la moda que 
                    valoran la calidad, el diseño y la atención personalizada. Cada prenda en nuestro 
                    catálogo es seleccionada pensando en ti.
                  </p>
                  <p>
                    Nuestro compromiso es contigo: ofrecerte la mejor experiencia de compra, productos 
                    de calidad excepcional y un servicio que supere tus expectativas.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
                <h4 className="text-2xl font-bold mb-4">¿Tienes Preguntas?</h4>
                <p className="text-lg mb-6 opacity-90">
                  Estamos aquí para ayudarte. Contáctanos y descubre por qué somos la mejor opción para tu estilo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                    <p className="font-semibold">📱 WhatsApp</p>
                    <p className="text-sm opacity-90">Respuesta inmediata</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                    <p className="font-semibold">🕒 Horario</p>
                    <p className="text-sm opacity-90">24/7 Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;