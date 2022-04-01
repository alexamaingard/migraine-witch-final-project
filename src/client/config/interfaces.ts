export interface SignInForm {
    username: string,
    password: string
}

export interface SignUpForm {
    username: string,
    email: string,
    password: string
}

export interface UserFromDB {
    data: {
        id: number,
        username: string
    },
    token: string,
    error: string
}