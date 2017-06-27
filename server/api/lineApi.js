import { Router } from 'express'
import axios from 'axios'
import querystring from 'querystring'

var router = Router()

const lineAPI = 'https://api.line.me/v2/oauth/accessToken'

router.post('/line-token', (req, res, next) => {
    // get the access_token first 
    axios.post(lineAPI, querystring.stringify(req.body),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }
    )
    .then((response) => {
        // get the user profile
        const lineProfileAPI = 'https://api.line.me/v2/profile'
        const token = response.data.access_token
        axios.get(lineProfileAPI, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            res.send(response.data)
        })
    })
})

export default router 
