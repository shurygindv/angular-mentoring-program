
interface IUser {
    Id: number;
    FirstName: string;
    LastName: string;
}

export default class User implements IUser {
    public Id: number;
    public FirstName: string;
    public LastName: string;
}
