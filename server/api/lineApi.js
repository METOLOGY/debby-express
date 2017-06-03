import { Router } from 'express'
import axios from 'axios'
import querystring from 'querystring'

var router = Router()

const lineAPI = 'https://api.line.me/v2/oauth/accessToken'

router.post('/line-token', (req, res, next) => {
    console.log(req.body)
    axios.post(lineAPI, querystring.stringify(req.body),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }
    )
    .then((response) => {
        res.send(response.data)
    })
})

export default router 
