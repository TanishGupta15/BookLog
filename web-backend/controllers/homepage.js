const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://zenquotes.io/api/today';
const key = process.env.qoutesKey;

router.get('/quote', async (req, res) => {
  const data = await axios.get(`${BASE_URL}?key={key}`);
  res.status(200).send(data.data);
});

module.exports = router;