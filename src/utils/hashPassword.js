import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.salt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

export const checkPassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashPassword);
        if (match) return match;

        console.log('Invalid password or email');
    } catch (error) {
        console.error(`Error comparing passwords: ${error}`);
    }
};