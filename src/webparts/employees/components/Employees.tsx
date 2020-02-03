import * as React from 'react';
import styles from './Employees.module.scss';
import { IEmployeesProps } from './IEmployeesProps';
import { IEmployeesState} from './IEmployeesState';
import { escape } from '@microsoft/sp-lodash-subset';

import { Nav} from 'office-ui-fabric-react/lib/Nav';
import { sp } from '@pnp/sp';

export default class Employees extends React.Component<IEmployeesProps, IEmployeesState> {

  constructor(props: any) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    
  }

  public render(): React.ReactElement<IEmployeesProps> {
    return (
      <label>this.state.items.length</label>
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
