-- Add payment_method and billing_address columns to orders table
-- (shipping_address already exists in V1)
ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50);
ALTER TABLE orders ADD COLUMN billing_address TEXT;
