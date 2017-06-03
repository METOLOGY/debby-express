import { Router } from 'express'

import users from './users'
import lineApi from './lineApi'

var router = Router()

// Add USERS Routes
router.use(users)
router.use(lineApi)

export default router
