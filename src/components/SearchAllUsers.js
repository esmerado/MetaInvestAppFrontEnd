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

export default class AllUsersPage extends React.Component {

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
      selectedUser: {

      }
    };

    this.items = [
      {
        lable: 'New',
        icon: 'pi pi-fw pi-plus',
        command: () => {this.showSaveDialog()}
      },
      {
        lable: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },
      {
        lable: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.deleteUser()}
      }
    ];
    this.userService = new UserService();
    this.insertUser = this.insertUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.footer = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.insertUser}/>
      </div>
    );
    this.footer2 = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.updateUser}/>
      </div>
    )
    
  }

  componentDidMount(){
    this.userService.getAll().then(data => {
      this.setState({users: data})
    })
    
  }
  
  insertUser() {
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
      this.userService.getAll().then(data => this.setState({users: data}))
    })
  }

  updateUser() {
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
      this.userService.getAll().then(data => this.setState({users: data}))
    })
  }

  deleteUser() {
    if(window.confirm("¿Desea eliminar el usuario?")) {
      console.log(this.state.selectedUser)
      this.userService.delete(this.state.selectedUser).then(data => {
        console.log(`data: ${data}`)
        this.deleteSuccess()
        this.userService.getAll().then(data => this.setState({users: data}))
        
      })
    }
  }

  showSaveDialog() {
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

  showEditDialog() {
    this.setState({
      visible : true,
      user : {
        entityId: this.state.selectedUser.entityId,
        name: this.state.selectedUser.name,
        mail: this.state.selectedUser.mail,
        password: this.state.selectedUser.password
      }
    })
  }

  showSuccess() {
    this.toast.show({severity:'success', summary: 'Success', detail:'User Saved', life: 3000});
  }

  deleteSuccess() {
    this.toast.show({severity:'success', summary: 'Success', detail:'User Deleted', life: 3000});
  }

  render() {

    return (

      <ThemeProvider theme={darkTheme}>

        <div style={{width: '70vw', margin: '4em auto 0'}}>
          <Menubar model={this.items}/><br/>
          <Panel header="Show All Users" >

            <DataTable value={this.state.users} paginator={true} rows="5" selectionMode="single" selection={this.state.selectedUser} onSelectionChange={e => this.setState({selectedUser: e.value})}>

              <Column field="entityId" header="ID"></Column>
              <Column field="name" header="NAME"></Column>
              <Column field="mail" header="MAIL"></Column>
              <Column field="password" header="PASSWORD"></Column>

            </DataTable>

          </Panel>

        </div>

        <Dialog header="User" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>

        <br/>
        
        <span className="p-float-label">
          <InputText disabled value={this.state.user.entityId} style={{width: '100%'}} onChange={(e) => {
            console.log(e)
            let val = e.target.value 
            this.setState(prevState => {
            let user = Object.assign({}, prevState.user)
            user.entityId = val

            return { user }
          })}
         } />
          <label htmlFor="entityId">Id</label>
          </span>

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

        </Dialog>

        <Toast ref={(el) => this.toast = el} />
      </ThemeProvider>

      
    )
  }

}