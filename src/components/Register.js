import React from "react";
import { createTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/core";
import { UserService } from "../config/api";
import { Column } from "primereact/column";
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

export default class Register extends React.Component {

  constructor() {
    super();
    this.showSuccess = this.showSuccess.bind(this);

    this.state = {
      visible: false,
      user: {
        entityId: null,
        name: null,
        mail: null,
        password: null
      },
    };

    
    this.userService = new UserService();
    this.insertUser = this.insertUser.bind(this); 
    
  }

  
  insertUser() {
    if(this.state.user.name !== null && this.state.user.mail !== null && this.state.user.password !== null) {
      this.userService.updateUser(this.state.user).then(data => {
        this.setState({
          visible: false,
          user: {
            entityId: null,
            name: null,
            mail: null,
            password: null
          },
        })
        this.showSuccess()
      }).catch()
    } else {
      this.showWarn(error => {
        console.log(error.response)
        this.showFail()
      })
    }
  }

  showSuccess() {
    this.toast.show({severity:'success', summary: 'Success', detail:'Login Success', life: 3000});
  }

  showFail() {
    this.toast.show({severity:'error', summary: 'Fail', detail:'Login Fail', life: 3000});
  }

  showWarn() {
    this.toast.show({severity:'warn', summary: 'Warning', detail:'You need to complete all the fields', life: 3000});
  }

  render() {

    return (

      <ThemeProvider theme={darkTheme}>

        <div style={{width: '70vw', margin: '4em auto 0'}}>
          <Panel header="Register" >
          <br/>

          <span className="p-float-label">
          <InputText value={this.state.user.name} style={{width: '100%'}} onChange={(e) => {
            let val = e.target.value 
            this.setState(prevState => {
            let user = Object.assign({}, prevState.user)
            user.name = val

            return { user }
          })}
         } />
          <label htmlFor="name">Name</label>
          </span>

          <br/>

          <span className="p-float-label">
          <InputText value={this.state.user.mail} style={{width: '100%'}} onChange={(e) =>{
            let val = e.target.value
            this.setState(prevState => {
            let user = Object.assign({}, prevState.user)
            user.mail = val

            return { user }
          })}
          } />
          <label htmlFor="mail">Mail</label>
          </span>

          <br/>

          <span className="p-float-label">
          <InputText value={this.state.user.password} style={{width: '100%'}} onChange={(e) =>{
            let val = e.target.value
            this.setState(prevState => {
            let user = Object.assign({}, prevState.user)
            user.password = val

            return { user }
          })} 
          }/>
          <label htmlFor="password">Password</label>
          </span>
          <br/>
          <div>
            <Button label="Register" icon="pi pi-check" onClick={this.insertUser}/>
          </div>
          </Panel>

        </div>
        

        <Toast ref={(el) => this.toast = el} />
      </ThemeProvider>

      
    )
  }

}