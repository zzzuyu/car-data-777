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
('Toyota', 'Red', 2021, 550000, 'ว่าง', 'https://cf.autodeft2.pw/uploads/images/Toyota%20Vios%202017.png'),
('Honda', 'Black', 2020, 480000, 'ขายแล้ว', 'https://cf.autodeft2.pw/uploads/images/2019/Press%20Event/Honda/Honda%20Accord/All-new%20Honda%20Accord_HYBRID.jpg'),
('Ford', 'Blue', 2019, 620000, 'กำลังซ่อม', 'https://www.autoinfo.co.th/uploads/2018/02/Ford-Ranger-Raptor_03-1024x732.jpg')
ON CONFLICT DO NOTHING;
