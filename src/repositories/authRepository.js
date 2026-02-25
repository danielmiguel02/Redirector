import { prisma } from '../config/db.js';

const registerUserRepository = async (data) => {
    const { name, email, password } = data;

    return prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
};

const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

export { registerUserRepository, findUserByEmail };