import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALTROUNDS);

export const hashPassword = async (password: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    password = hash;

    return password;
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}
