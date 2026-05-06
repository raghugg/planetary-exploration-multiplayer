const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'leaderboard',
    password: '',
    port: 5432,
});

app.get('/leaderboard', async (req, res) => {
    const result = await pool.query('SELECT player_name, score FROM scores ORDER BY score DESC LIMIT 10');
    res.json(result.rows);
});

app.post('/scores', async (req, res) => {
    const { player_name, score } = req.body;
    const result = await pool.query(
        'INSERT INTO scores (player_name, score) VALUES ($1, $2) RETURNING *',
        [player_name, score]
    );
    res.json(result.rows[0]);
});

app.listen(3000, () => console.log('Server running on port 3000'));
