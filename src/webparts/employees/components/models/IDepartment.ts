import { IEmployee } from "./IEmployee";

export interface IDepartment {
    Title: string;
    HeadOfDepartment: string;
    Employees: IEmployee[];
}