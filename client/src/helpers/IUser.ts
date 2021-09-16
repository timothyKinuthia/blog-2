export interface IUserLogin {
    account: string;
    password: string;
};

export interface IUserRegister extends IUserLogin {
    name: string;
    passwordConfirm: string;
};

export interface IUserData extends IUserLogin {
    role: string;
    type: string;
    isActivated: boolean;
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export interface IAUTH extends IUserData {
    token: string;
    user: IUserData
}