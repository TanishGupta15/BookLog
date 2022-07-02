const express = require('express');
const { route } = require('./user');
const axios =  require('axios');
const router = express.Router();

const BASE_URL = 'https://zenquotes.io/api/today';
const key = process.env.qoutesKey;

router.get('/quote', async (req, res) => {
  const data = await axios.get(`${BASE_URL}`);
  res.send(200);
  return data.data[0];
});

module.exports = router;