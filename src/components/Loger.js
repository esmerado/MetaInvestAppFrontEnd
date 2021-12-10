import React from "react";
import { createTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/core";
import { UserService } from "../config/api";

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

export default class Loger extends React.Component  {

  constructor() {
    super();
    this.showSuccess = this.showSuccess.bind(this);
    this.state = {
      user: {
        entityId: null,
        name: null,
        mail: null,
        password: null
      },
      userGetted: {
        
      },
    };
    this.userService = new UserService();
    this.loginUser = this.loginUser.bind(this)
  }


  loginUser() {
    if(this.state.user.mail === null || this.state.user.password === null){
      this.showWarn()
    } else{
      this.userService.getUserByMailAndPassword(this.state.user).then(data => {
        this.setState({
          userGetted: data,
        })
        if(data !== "") {
          this.showSuccess()
          this.showLoginDialog()
        } else {
          this.showFail()
        }
      }).catch(error => {
        console.log(error.response)
        this.showFail()
      });
      
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

  showLoginDialog() {
    this.setState({
      visible: true,
      user: {
        entityId: null,
        name: null,
        mail: null,
        password: null
      }
    })
  }

  render() {
    
    return (
      <ThemeProvider theme={darkTheme}>

          <Panel header="Login" style={{width: '50vw', margin: '4em auto 0'}}>

            <div className="p-fluid">
              <br/>
              <span className="p-float-label">
              <InputText value={this.state.value} style={{width: '100%'}} onChange={(e) => {
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
              <InputText value={this.state.value} style={{width: '100%'}} onChange={(e) => {
                 let val = e.target.value 
                 this.setState(prevState => {
                 let user = Object.assign({}, prevState.user)
                 user.password = val
                 
                 return { user }
               })}
              } />
              <label htmlFor="password">Password</label>
              </span>

              <div style={{width: "10vw", alignItems: "center", marginTop: "2em", padding: "0em"}}>
                <Button label="Login" icon="pi pi-check" onClick={this.loginUser}/>
              </div>

            </div>
            
          </Panel>

          <Dialog header="Welcome Again" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>

            <div>

              <h2 style={{fontWeight: "1em"}}>{`Hello ${this.state.userGetted.name}`}</h2>
              <p>{`Your mail is: ${this.state.userGetted.mail}`}</p>

            </div>

              
            
          </Dialog>

          <Toast ref={(el) => this.toast = el} />
      </ThemeProvider>
    )
  }
}