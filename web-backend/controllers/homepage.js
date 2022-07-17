const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://zenquotes.io/api/today';
const key = process.env.qoutesKey;

router.get('/quote', async (req, res) => {
  try {
    const quote = await axios.get(`${BASE_URL}`);
    res.status(200).send(quote.data);
  } catch (err) {
    return err;
  }
});

module.exports = router;
