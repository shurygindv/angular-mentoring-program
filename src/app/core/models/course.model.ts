
export interface ICourseModelApi {
    Id: number;
    Title: string;
    CreationDate: string | Date;
    Duration: number;
    Description: string;
}

export interface ICourse {
    id: number;
    title: string;
    creationDate: string | Date;
    duration: number;
    description: string;
}

export class Course implements ICourse {
    public id: number;
    public title: string;
    public creationDate: string| Date;
    public duration: number;
    public description: string;
}

export class CourseModelApi implements ICourseModelApi {
    public static mapToCourses (models: ICourseModelApi[]): ICourse[] {

        return models.map((model: ICourseModelApi) => ({
             id: model.Id,
             title: model.Title,
             creationDate: model.CreationDate,
             duration: model.Duration,
             description: model.Description,
        }));
    }
    // tslint:disable:variable-name
    public Id: number;
    public Title: string;
    public CreationDate: string | Date;
    public Duration: number;
    public Description: string;
    // tslint:enable:variable-name
}
