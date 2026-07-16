CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    year INTEGER,
    price DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'ว่าง',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars (brand, color, year, price, status, image_url) VALUES 
('Toyota', 'Red', 2021, 550000, 'ว่าง', 'https://images.unsplash.com/photo-1590362891991-f7614d02b8d0?auto=format&fit=crop&w=400&q=80'),
('Honda', 'Black', 2020, 480000, 'ขายแล้ว', 'https://images.unsplash.com/photo-1592837330830-7463f2824b2b?auto=format&fit=crop&w=400&q=80'),
('Ford', 'Blue', 2019, 620000, 'กำลังซ่อม', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80')
ON CONFLICT DO NOTHING;
