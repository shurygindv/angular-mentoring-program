
export interface IUserApiModel {
    Id: number;
    FirstName: string;
    LastName: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
}

export class User implements IUser {
    public id: number;
    public firstName: string;
    public lastName: string;
}

export class UserApiModel implements IUserApiModel {
    // tslint:disable:variable-name
    public Id: number;
    public FirstName: string;
    public LastName: string;
    // tslint:enable:variable-name
}
