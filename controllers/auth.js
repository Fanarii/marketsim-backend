import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const register = async (req, res) => {
    const { name, password, role } = req.body

    try {
        const response = await prisma.user.create({
            data: {
                name: name,
                password: password,
                role: role
            }
        })

        req.session.userId = response.id
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        if (!req.session) return res.status(400).json({ msg: 'Already logged out' })

        const response = await req.session.destroy()
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const login = async (req, res) => {
    const { name, password } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { name: name } })
        if (!user) return res.status(404).json({ msg: 'User not found' })
        if (password != user.password || name != user.name) return res.status(400).json({ msg: 'Wrong password or name' })

        req.session.userId = user.id

        const money = user.money
        const lisences = user.lisences

        res.json({ name, money, lisences })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const checkSession = async (req, res) => {
    try {
        if (!req.session.userId) return res.status(400).json({ msg: 'Not login yet' })
        const response = await prisma.user.findUnique({ where: { id: parseInt(req.session.userId) } })
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
