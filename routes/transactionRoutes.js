import express from 'express'

import { buyLisence, buyProduct, sellProduct } from '../controllers/transaction.js'
import { verifyUser } from '../middleware/verify.js'

const router = express.Router()

router.post('/lisences/:id', verifyUser, buyLisence)
router.post('/products/:id', verifyUser, buyProduct)
router.patch('/product/:id', verifyUser, sellProduct)

export default router