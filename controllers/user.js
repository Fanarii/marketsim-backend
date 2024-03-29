import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany({
            select: {
                name: true,
                money: true,
                lisences: true
            }
        })
        res.json(response)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await prisma.user.findUnique({
            where: { id: req.params.id }
        })
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, password, role, money } = req.body

    try {
        const response = await prisma.user.create({
            data: {
                name: name,
                password: password,
                role: role,
                money: money
            }
        })

        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { name, password, money } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } })
        if (!user) return res.status(404).json({ msg: 'User not found' })

        const response = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: name || user.name,
                password: password || user.password,
                money: money || user.money
            }
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const response = await prisma.user.delete({ where: { id: parseInt(req.params.id) } })
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}