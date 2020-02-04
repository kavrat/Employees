import * as React from 'react';
import styles from './Employees.module.scss';
import { IEmployeesProps } from './IEmployeesProps';
import { IEmployeesState} from './IEmployeesState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Nav, INavLinkGroup, INavLink} from 'office-ui-fabric-react/lib/Nav';
import { sp } from '@pnp/pnpjs';
import { IDepartment } from './models/IDepartment';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';

export default class Employees extends React.Component<IEmployeesProps, IEmployeesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      groups: []
    };
  }

  private _fillGroups(departments: IDepartment[]): INavLinkGroup[] {
    var newGroup: INavLinkGroup[] = [];
    var sampleLink1: INavLink[] = [
      {name: 'sample 1', url: '~'},
      {name: 'sample 2', url: '~'},
      {name: 'sample 3', url: '~'}
    ];
    departments.forEach((value)=> {
      console.log(value.Title);
      var item: INavLinkGroup = {
        name: value.Title,
        links: sampleLink1
      };
      newGroup.push(item);
    });
    return newGroup;
  }
  public componentDidMount(): void {
    sp.web.lists.getByTitle('Departments').items.select('ID', 'Title').get().then((result: IDepartment[]) => {
      result.forEach((value) => {
        console.log(value.Title);
      });
      this.setState({
        groups: this._fillGroups(result)
      });

    });
  }

  public render(): React.ReactElement<IEmployeesProps> {
    if(!this.state.groups) {
      return (<div>Items not loaded</div>);
    }

  //   const deps = this.state.items.map((item, key) => 
  // <li key={item.ID}>{item.Title}, {item.HeadOfDepartment.Title}</li>
  //     );
    return (
      <div>
        <Nav
          ariaLabel='Departments'
          groups={this.state.groups}
        />
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
