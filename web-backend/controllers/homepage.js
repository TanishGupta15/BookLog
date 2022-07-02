const express = require('express');
const { route } = require('./user');
const router = express.Router();

const BASE_URL = 'https://zenquotes.io/api/today'
const key = process.env.qoutesKey

// const api = async () => fetch({
//   method: "POST",
//   url: BASE_URL,
//   headers: {
//     key: process.env.qoutesKey
//   }
// })
const getQuote = async () => {
  const response = await fetch(`${BASE_URL} `, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
  const data = await response.json()
  return data
}

// const asyncApiCall = async () => {
//   const response = await QuoteAPI.getQuote()
//   console.log(response.data)
//   console.log(response.data[0].h)
// }

router.get('/quote', getQuote)

module.exports = router;