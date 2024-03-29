import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getLisences = async (req, res) => {
    try {
        const response = await prisma.lisence.findMany()

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getLisenceById = async (req, res) => {
    try {
        const response = await prisma.lisence.findUnique({
            where: { id: parseInt(req.params.id) }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createLisence = async (req, res) => {
    console.log(req.body)
    try {
        const response = await prisma.lisence.create({
            data: {
                name: req.body.name,
                price: req.body.price
            }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error)
    }
}

export const updateLisence = async (req, res) => {
    const { name, price, productId } = req.body
    const { id } = req.params

    try {
        const product = await prisma.product.findMany({
            where: { id: parseInt(productId) }
        })

        const lisence = await prisma.lisence.findUnique({
            where: { id: parseInt(id) }
        })

        const response = await prisma.lisence.update({
            where: { id: parseInt(id) },
            data: {
                name: name || lisence.name,
                price: price || lisence.price,
                products: product || lisence.product
            }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteLisence = async (req, res) => {
    try {
        const response = await prisma.lisence.delete({
            where: { id: parseInt(req.params.id) }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}