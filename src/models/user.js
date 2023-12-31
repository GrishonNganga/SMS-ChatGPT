import { PrismaClient }  from '@prisma/client'

const prisma = new PrismaClient()

async function createUser (phone) {
    const user = await prisma.user.create({
        data: {
            phone
        }
    })
    return user
}

async function getUserByPhone (phone) {
    const user = await prisma.user.findFirst({
        where: {
            phone
        }
    })
    return user
}

export {
    createUser, getUserByPhone
}