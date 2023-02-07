interface SignIn {
    username: string;
    password: string;
}

export const generateSignInForm = (signIn: Partial<SignIn> = {}): SignIn => ({
    username: signIn.username,
    password: signIn.password,
} as SignIn);
