import { findUserByEmail, registerUserRepository } from '../repositories/authRepository.js';
import { checkPassword, hashPassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';
import { ApiError } from '../utils/ApiError.js';

// registerUserService, loginUserService

const registerUserService = async ({name, email, password}) => {
    if (await findUserByEmail(email)) {
        throw new ApiError(409, "Email is already in use");
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
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Email or password is wrong");
    }

    const isValid = await checkPassword(password, user.password);

    if (!isValid) {
        throw new ApiError(401, "Email or password is wrong");
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