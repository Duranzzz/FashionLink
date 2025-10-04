-- Sample data for FashionLink database
-- Run this after creating the database and tables

USE fashionlink_db;

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Camisa Elegante Blanca', 'Una camisa de vestir clásica perfecta para ocasiones especiales.', 45.99, 'Camisas', 'images/XtIIYsPrPXMR.jpg', 5),
('Camisa Casual Azul', 'Camisa cómoda para el día a día con un toque moderno.', 35.50, 'Camisas', 'images/fDDCJer9PB84.jpg', 8),
('Pantalón Casual Negro', 'Pantalones cómodos y versátiles para cualquier ocasión.', 42.00, 'Pantalones', 'images/5sR5VsHXFAWD.jpg', 10),
('Pantalón de Vestir', 'Pantalón formal de alta calidad para eventos importantes.', 65.00, 'Pantalones', 'images/KyPp7lW60Hms.jpg', 6),
('Vestido de Noche Elegante', 'Un hermoso vestido para eventos nocturnos y celebraciones.', 89.00, 'Vestidos', 'images/quI2uvEOEroO.jpg', 3),
('Vestido Casual Verano', 'Vestido ligero y fresco perfecto para el verano.', 55.00, 'Vestidos', 'images/wj5FNhoSEXJN.jpg', 7),
('Chaqueta de Cuero Sintético', 'Chaqueta moderna de cuero sintético con estilo urbano.', 75.00, 'Chaquetas', 'images/XMKaB6BFNebH.jpg', 4),
('Blazer Formal', 'Blazer elegante para completar tu look profesional.', 95.00, 'Chaquetas', 'images/uwGnLDyjqZMQ.webp', 5);

-- Note: You can add more sample products as needed
-- Make sure the image paths correspond to actual images in your images/ directory
