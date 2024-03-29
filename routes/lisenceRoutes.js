import express from 'express'
import { getLisences, getLisenceById, createLisence, updateLisence, deleteLisence } from '../controllers/lisence.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

router.get('/lisences', verifyAdmin, getLisences)
router.get('/lisences/:id', verifyAdmin, getLisenceById)
router.post('/lisences', verifyAdmin, createLisence)
router.put('/lisences/:id', verifyAdmin, updateLisence)
router.delete('/lisences/:id', verifyAdmin, deleteLisence)

export default router