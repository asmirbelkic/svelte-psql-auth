import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import type { User } from '@prisma/client'

import prisma from '../prisma'

const createAccount = async (data: { email: string; name: string; password: string }): Promise<User> => {
    const userId = uuidv4()
    const hashedPassword = bcrypt.hashSync(data.password, 12)

    const user = await prisma.user.create({
        data: {
            id: userId,
            email: data.email,
            name: data.name,
            avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
            password: hashedPassword, // Add the 'password' property with the hashed password value
        },
    })

    return user!
}

export default createAccount
