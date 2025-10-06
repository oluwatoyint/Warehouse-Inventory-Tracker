-- Create database and user (run as PostgreSQL superuser)
CREATE DATABASE inventory_db;

-- Connect to the database
\c inventory_db;

-- Create a dedicated user (optional but recommended for security)
CREATE USER postgres WITH PASSWORD 'Laulatu2?';
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO postgres;

-- Create items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    location VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
CREATE INDEX IF NOT EXISTS idx_items_location ON items(location);

-- Grant permissions to the user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Insert sample data (optional)
INSERT INTO items (name, quantity, location) VALUES
    ('Laptop', 25, 'Warehouse A'),
    ('Monitor', 40, 'Warehouse B'),
    ('Keyboard', 75, 'Warehouse A'),
    ('Mouse', 100, 'Warehouse C')
ON CONFLICT DO NOTHING;
