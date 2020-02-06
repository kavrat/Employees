import * as React from 'react';
import styles from './Employees.module.scss';
import { IEmployeesProps } from './IEmployeesProps';
import { IEmployeesState} from './IEmployeesState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Nav, INavLinkGroup, INavLink} from 'office-ui-fabric-react/lib/Nav';
import { sp } from '@pnp/pnpjs';
import { IDepartment } from './models/IDepartment';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';
import { IEmployee } from './models/IEmployee';

export default class Employees extends React.Component<IEmployeesProps, IEmployeesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      navGroups: [],

    };
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
            url: '~'
          };
          employeelinks.push(tempLink);
          console.log(employee.Department.Title);
          console.log(employee.Title);
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

  // private _fillGroups(departments: IDepartment[]): INavLinkGroup[] {
  //   var newGroup: INavLinkGroup[] = [];
  //   var sampleLink1: INavLink[] = [
  //     {name: 'sample 1', url: '~'},
  //     {name: 'sample 2', url: '~'},
  //     {name: 'sample 3', url: '~'}
  //   ];
  //   departments.forEach((value)=> {
  //     console.log(value.Title);
  //     var item: INavLinkGroup = {
  //       name: value.Title,
  //       links: sampleLink1
  //     };
  //     newGroup.push(item);
  //   });
  //   return newGroup;
  // }
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
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg8">B</div>
        </div>

      </div>
      // <div className={ styles.employees }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
