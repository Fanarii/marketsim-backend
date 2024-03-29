import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(400).json({ msg: 'Please login to your account' });
    }

    const userId = parseInt(req.session.userId);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    next()
}

export const verifyAdmin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(400).json({ msg: 'Please login to your account' });
    }

    const userId = parseInt(req.session.userId);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== "ADMIN") {
        return res.status(403).json({ msg: 'Access forbidden'})
    }

    next()
}