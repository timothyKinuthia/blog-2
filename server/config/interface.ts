
export interface DecodedUser {
    id: string,
    iat: number,
    exp: number
}

export interface IGooglePayload {
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
};

export interface IUserParams {
    name: string;
    account: string;
    password: string;
    avatar?: string;
    type: string;
}