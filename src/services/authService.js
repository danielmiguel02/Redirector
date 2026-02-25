import { findUserByEmail, registerUserRepository } from '../repositories/authRepository.js';
import { checkPassword, hashPassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';

// registerUserService, loginUserService

const registerUserService = async ({name, email, password}) => {
    if (await findUserByEmail(email)) {
        throw new Error("Email is already in use");
    }

    const hashedPassword = await hashPassword(password);

    const user = await registerUserRepository({
        name: name,
        email: email,
        password: hashedPassword
    });

    return {
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    };
};

const loginUserService = async ({email, password}) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Email or password is wrong");
    }

    const isValid = await checkPassword(password, user.password);

    if (!isValid) {
        throw new Error("Email or password is wrong");
    }

    const token = generateToken({id: user.id});

    return {
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        },
    };
};

export { registerUserService, loginUserService };