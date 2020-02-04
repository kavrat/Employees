import * as React from 'react';
import styles from './Employees.module.scss';
import { IEmployeesProps } from './IEmployeesProps';
import { IEmployeesState} from './IEmployeesState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Nav} from 'office-ui-fabric-react/lib/Nav';
import { sp } from '@pnp/pnpjs';
import { IDepartment } from './models/IDepartment';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';

export default class Employees extends React.Component<IEmployeesProps, IEmployeesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    sp.web.lists.getByTitle('Departments').items.select('ID', 'Title', 'HeadOfDepartment/Title').expand('HeadOfDepartment/Title').get().then((result: IDepartment[]) => {
      this.setState({
        items: result
      });
      result.forEach((value) => {
        console.log(value.HeadOfDepartment);
      });
    });
  }

  public render(): React.ReactElement<IEmployeesProps> {
    if(!this.state.items) {
      return (<div>Items not loaded</div>);
    }

    const deps = this.state.items.map((item, key) => 
  <li key={item.ID}>{item.Title}, {item.HeadOfDepartment.Title}</li>
      );
    return (
      <div>
        <ul>
          {deps}
        </ul>
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
