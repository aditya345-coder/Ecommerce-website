-- Insert sample categories
INSERT INTO categories (name, description) VALUES 
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Fashion and apparel'),
('Books', 'Books and educational materials'),
('Home & Garden', 'Home improvement and garden supplies');

-- Insert sample products with image URLs
INSERT INTO products (sku, name, description, price, stock, image_url, category_id) VALUES 
('LAPTOP001', 'Gaming Laptop', 'High-performance gaming laptop with RTX graphics card, 16GB RAM, 1TB SSD', 1299.99, 10, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1),
('PHONE001', 'Smartphone Pro', 'Latest smartphone with advanced camera system, 128GB storage, 5G ready', 699.99, 25, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 1),
('HEADPHONE001', 'Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery', 199.99, 15, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 1),
('TABLET001', 'Tablet Computer', '10-inch tablet with high-resolution display and long battery life', 399.99, 8, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 1),
('TSHIRT001', 'Cotton T-Shirt', 'Comfortable 100% cotton t-shirt available in multiple colors', 19.99, 50, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 2),
('JEANS001', 'Classic Denim Jeans', 'Classic blue denim jeans with comfortable fit', 49.99, 30, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 2),
('HOODIE001', 'Fleece Hoodie', 'Warm and cozy fleece hoodie perfect for casual wear', 39.99, 20, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 2),
('SNEAKERS001', 'Running Shoes', 'Comfortable running shoes with excellent cushioning', 89.99, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2),
('BOOK001', 'Programming Guide', 'Complete guide to modern programming languages and frameworks', 39.99, 20, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 3),
('BOOK002', 'Web Development', 'Learn web development from scratch with HTML, CSS, and JavaScript', 29.99, 15, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 3),
('BOOK003', 'Data Science', 'Introduction to data science and machine learning concepts', 49.99, 12, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', 3),
('BOOK004', 'System Design', 'Learn system design principles for scalable applications', 59.99, 10, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', 3),
('TOOL001', 'Garden Tools Set', 'Complete set of professional garden tools for all gardening needs', 79.99, 8, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 4),
('DECOR001', 'Wall Art Canvas', 'Beautiful hand-painted wall decoration piece', 59.99, 12, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400', 4),
('PLANT001', 'Indoor Plant', 'Low-maintenance indoor plant perfect for home decoration', 24.99, 18, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 4),
('LAMP001', 'Modern Table Lamp', 'Sleek modern table lamp with LED lighting', 89.99, 6, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 4);

-- Insert sample users with password: user123
-- Generated using BCrypt with strength 10
-- Admin user (password: user123)
INSERT INTO users (email, password_hash, full_name, role) VALUES 
('admin@shop.com', '$2b$10$uL52OkolSKPcdafiDK4mkOkMDCkRXTYNtjIY.W53J/5EcIWRC.prK', 'Admin User', 'ADMIN');

-- Regular users (password: user123)
INSERT INTO users (email, password_hash, full_name, role) VALUES 
('user@shop.com', '$2b$10$uL52OkolSKPcdafiDK4mkOkMDCkRXTYNtjIY.W53J/5EcIWRC.prK', 'John Doe', 'USER'),
('jane@shop.com', '$2b$10$uL52OkolSKPcdafiDK4mkOkMDCkRXTYNtjIY.W53J/5EcIWRC.prK', 'Jane Smith', 'USER'),
('bob@shop.com', '$2b$10$uL52OkolSKPcdafiDK4mkOkMDCkRXTYNtjIY.W53J/5EcIWRC.prK', 'Bob Johnson', 'USER');
