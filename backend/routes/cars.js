const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all cars (with filtering)
router.get('/', async (req, res) => {
    try {
        const { brand, color, year, minPrice, maxPrice, status } = req.query;
        let queryStr = 'SELECT * FROM cars WHERE 1=1';
        const params = [];
        let paramCount = 1;

        if (brand) { queryStr += ` AND brand ILIKE $${paramCount++}`; params.push(`%${brand}%`); }
        if (color) { queryStr += ` AND color ILIKE $${paramCount++}`; params.push(`%${color}%`); }
        if (year) { queryStr += ` AND year = $${paramCount++}`; params.push(year); }
        if (minPrice) { queryStr += ` AND price >= $${paramCount++}`; params.push(minPrice); }
        if (maxPrice) { queryStr += ` AND price <= $${paramCount++}`; params.push(maxPrice); }
        if (status) { queryStr += ` AND status = $${paramCount++}`; params.push(status); }

        queryStr += ' ORDER BY created_at DESC';

        const { rows } = await db.query(queryStr, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single car
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Car not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new car
router.post('/', async (req, res) => {
    try {
        const { brand, color, year, price, status, image_url } = req.body;
        const result = await db.query(
            'INSERT INTO cars (brand, color, year, price, status, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [brand, color, year, price, status, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update car
router.put('/:id', async (req, res) => {
    try {
        const { brand, color, year, price, status, image_url } = req.body;
        const result = await db.query(
            'UPDATE cars SET brand=$1, color=$2, year=$3, price=$4, status=$5, image_url=$6 WHERE id=$7 RETURNING *',
            [brand, color, year, price, status, image_url, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE car
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM cars WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
