import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.patch('/users/:id', updateUser)
router.post('/users', createUser)
router.delete('/users/:id', deleteUser)
