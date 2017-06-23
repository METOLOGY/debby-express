import { Router } from 'express'

import users from './users'
import lineApi from './lineApi'
import getArticles from './getArticles'

var router = Router()

// Add USERS Routes
router.use(users)
router.use(lineApi)
router.use(getArticles)

export default router
