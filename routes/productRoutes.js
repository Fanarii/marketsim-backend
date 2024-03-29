import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.js'
import { verifyAdmin } from '../middleware/verify.js'

const router = express.Router()

router.get('/products', verifyAdmin, getProducts)
router.get('/products/:id', verifyAdmin, getProductById)
router.post('/products', verifyAdmin, createProduct)
router.patch('/products/:id', verifyAdmin, updateProduct)
router.delete('/products/:id', verifyAdmin, deleteProduct)

export default router