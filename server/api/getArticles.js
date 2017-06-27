import { Router } from 'express'
import axios from 'axios'
// import querystring from 'querystring'

var router = Router()

const api = 'https://obscure-beach-33269.herokuapp.com/api/v1/ask/'

router.get('/get-articles/:question', (req, res, next) => {
  const question = req.params.question
  axios.post(api, { question: question })
    .then((response) => {
      const news = response.data
      res.send(news)
    })
})

export default router
