import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const buyLisence = async (req, res) => {
    try {
        const userId = req.session.userId
        const lisenceId = parseInt(req.params.id);
        const lisence = await prisma.lisence.findUnique({ where: { id: lisenceId } });
        if (!lisence) {
            return res.status(404).json({ msg: 'Lisence not found' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const boughtLisence = await prisma.lisence.findFirst({
            where: {
                id: lisence.id,
                users: { some: { id: userId } }
            }
        })

        if (boughtLisence) {
            return res.status(400).json({ msg: 'Lisence bought' })
        }

        const notEnoughMoney = user.money < lisence.price;
        if (notEnoughMoney) {
            return res.status(400).json({ msg: 'Not enough money to buy this lisence' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                money: user.money - lisence.price,
                lisences: {
                    connect: { id: lisenceId }
                }
            }
        });

        res.json({ msg: 'Lisence purchased successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const buyProduct = async (req, res) => {
    const { quantity } = req.body;
    try {
        const productId = parseInt(req.params.id);
        const userId = parseInt(req.session.userId);

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const totalAmount = product.price * quantity;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.money < totalAmount) {
            return res.status(400).json({ msg: 'Not enough money' });
        }

        const lisence = await prisma.lisence.findFirst({
            where: {
                id: product.lisenceId,
                users: { some: { id: userId } }
            }
        });

        if (!lisence) {
            return res.status(400).json({ msg: 'User does not have the required lisence for this product' });
        }

        const existingUserProduct = await prisma.userProduct.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (existingUserProduct) {
            await prisma.userProduct.update({
                where: { id: existingUserProduct.id },
                data: {
                    quantity: existingUserProduct.quantity + quantity
                }
            });
        } else {
            await prisma.userProduct.create({
                data: {
                    user: { connect: { id: userId } },
                    product: { connect: { id: productId } },
                    quantity: quantity,
                    marketPrice: product.marketPrice
                }
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                money: user.money - totalAmount
            }
        });

        res.json({ msg: 'Product purchased successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const sellProduct = async (req, res) => {
    try {
        const userId = req.session.userId;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const productId = req.params.id
        const userProduct = await prisma.userProduct.findFirst({
            where: {
                id: parseInt(productId),
            }
        });

        if (!userProduct) {
            return res.status(404).json({ msg: 'Product not found in user inventory' });
        }

        if (userProduct.quantity < 1) {
            return res.status(400).json({ msg: "No product in your inventory" })
        }

        await prisma.userProduct.update({
            where: { id: userProduct.id },
            data: {
                quantity: userProduct.quantity - 1
            }
        });

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                money: user.money + userProduct.marketPrice
            }
        });

        res.json({ msg: 'Product sold successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
