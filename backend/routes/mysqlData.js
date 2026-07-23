const express = require('express');
const router = express.Router();
const mysqlPool = require('../mysql');

router.get('/users-profiles', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query(
      `SELECT u.id, u.email, u.name, p.display_name, p.avatar_url, p.bio, p.phone
       FROM users u
       LEFT JOIN profiles p ON p.user_id = u.id
       LIMIT 100`
    );
    res.json(rows);
  } catch (error) {
    console.error('MySQL query error:', error);
    res.status(500).json({ error: 'Unable to fetch MySQL data' });
  }
});

module.exports = router;
