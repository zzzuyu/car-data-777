const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, user_id, display_name, avatar_url, bio, phone, updated_at FROM profiles WHERE user_id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile get error:', error);
    res.status(500).json({ error: 'Unable to load profile' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { display_name, avatar_url, bio, phone } = req.body;
    const existing = await db.query('SELECT id FROM profiles WHERE user_id = $1', [req.user.userId]);

    if (existing.rows.length > 0) {
      const updateResult = await db.query(
        `UPDATE profiles
         SET display_name = $1,
             avatar_url = $2,
             bio = $3,
             phone = $4,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $5
         RETURNING id, user_id, display_name, avatar_url, bio, phone, updated_at`,
        [display_name, avatar_url, bio, phone, req.user.userId]
      );

      return res.json(updateResult.rows[0]);
    }

    const insertResult = await db.query(
      `INSERT INTO profiles (user_id, display_name, avatar_url, bio, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, display_name, avatar_url, bio, phone, updated_at`,
      [req.user.userId, display_name, avatar_url, bio, phone]
    );

    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    console.error('Profile save error:', error);
    res.status(500).json({ error: 'Unable to save profile' });
  }
});

module.exports = router;
