import * as React from 'react';
import styles from './Employees.module.scss';
import { IEmployeesProps } from './IEmployeesProps';
import { IEmployeesState} from './IEmployeesState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Nav, INavLinkGroup, INavLink} from 'office-ui-fabric-react/lib/Nav';
import { sp } from '@pnp/pnpjs';
import { IDepartment } from './models/IDepartment';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';
import { IEmployee } from './models/IEmployee';
import { getChildren } from 'office-ui-fabric-react/lib/Utilities';

export default class Employees extends React.Component<IEmployeesProps, IEmployeesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      navGroups: [],
      showDetails: false,
      employee: null

    };
    this.getData = this.getData.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }
  
  private handleClick(item: IEmployee) {
    this.setState({
      showDetails: !this.state.showDetails,
      employee: item
    });
  }

  private getData() {
    if(this.state.showDetails) {
    return <Label>{this.state.employee.Title}</Label>;
    }
    else {
      return <Label>{this.state.showDetails}</Label>;
    }
  }


  private _fillOrgStructure(departments: IDepartment[], employees: IEmployee[]): INavLinkGroup[] {
    let newGroup: INavLinkGroup[] = [];
    let employeelinks: INavLink[] = [];

    departments.forEach((department) => {
      console.log(department.Title);
      employees.forEach((employee) =>{
        if(employee.Department.Title.toString() == department.Title.toString()) {
          var tempLink: INavLink = {
            name: employee.Title,
            url: null,
            onClick: () => {
              this.handleClick(employee);
            }
          };
          employeelinks.push(tempLink);
        }
      });
      let item: INavLinkGroup ={
        name: department.Title,
        links: employeelinks,
        collapseByDefault: true
      };
      employeelinks = [];
      newGroup.push(item);
    });
    
    return newGroup;
  }

  public componentDidMount(): void {
    //get Departments
    sp.web.lists.getByTitle('Departments').items.select('ID', 'Title').get().then((deps: IDepartment[]) => {
      sp.web.lists.getByTitle('Employees').items.select('ID', 'Title', 'Department/Title').expand('Department/Title').get().then((emps: IEmployee[]) => {
        // deps.forEach((val) => {
        //   console.log(val.Title);
        // });
        // emps.forEach((val) => {
        //   console.log(val.Title);
        // });

        this.setState({
          navGroups: this._fillOrgStructure(deps, emps)
        });
      });
    });
    //get employees
    
    
  }

  public render(): React.ReactElement<IEmployeesProps> {
    if(!this.state.navGroups) {
      return (<div>Items not loaded</div>);
    }

  //   const deps = this.state.items.map((item, key) => 
  // <li key={item.ID}>{item.Title}, {item.HeadOfDepartment.Title}</li>
  //     );
    return (
      <div className='ms-grid' dir='ltr'>
        <div className='ms-Grid-row'>
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
            <Nav
              ariaLabel='Departments'
              groups={this.state.navGroups}
              styles={{
                root: {
                  width: 208,
                  height: 500,
                  boxSizing: 'border-box',
                  border: '1px solid #eee',
                  overflowY: 'auto'
                }
              }}
            />
          </div>
            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8"><this.getData></this.getData></div>
        </div>
      </div>
    );
  }
}
