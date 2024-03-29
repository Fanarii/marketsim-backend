import express from 'express'
import { register, logout, checkSession, login } from '../controllers/auth.js'
import { getUsers } from '../controllers/user.js'

const router = express.Router()

router.post('/register', register)
router.delete('/logout', logout)
router.post('/login', login)
router.get('/check', checkSession)

export default router