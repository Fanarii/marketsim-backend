import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getProducts = async (req, res) => {
    try {
        const response = await prisma.product.findMany()

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const response = await prisma.product.create({
            data: {
                name: req.body.name,
                price: parseInt(req.body.price),
                marketPrice: parseInt(req.body.marketPrice),
                lisenceId: parseInt(req.body.lisenceId)
            }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { name, price, marketPrice, lisenceId } = req.body
    const { id } = req.params

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        })

        const response = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name: name || product.name,
                price: price || product.price,
                marketPrice: marketPrice || product.marketPrice,
                lisenceId: lisenceId || product.lisenceId
            }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const response = await prisma.product.delete({
            where: { id: parseInt(req.params.id) }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}