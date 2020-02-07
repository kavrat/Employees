import { INavLinkGroup, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { IItemLink } from './models/IItemLink';
import { IDepartment } from './models/IDepartment';
import { IEmployee } from './models/IEmployee';

export interface IEmployeesState {
    navGroups: INavLinkGroup[];
    showDetails: boolean;
    employee: IEmployee;
}