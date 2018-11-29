
export interface ICourse {
    Id: number;
    Title: string;
    CreationDate: string;
    Duration: number;
    Description: string;
}

export default class Course implements ICourse {
    public Id: number;
    public Title: string;
    public CreationDate: string;
    public Duration: number;
    public Description: string;
}
