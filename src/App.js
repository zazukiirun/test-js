import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import 'semantic-ui-css/semantic.min.css';
import UserList from './components/UserList';
import MyForm from './components/MyForm';
import axios from 'axios';
import Loader from './Loader';


class App extends Component { 
  state = {
    users: [],
    loader: false,
    user: {},
    // url0: "http://localhost/laravel-rest-api/public/api/customers",
    url: "/api/user"
  };

  getUsers = async () => {
    this.setState({ loader: true });
    const users = await axios.get(this.state.url);
    this.setState({ users: users.data, loader: false });
  };

  deleteUser = async id => {
    this.setState({ loader: true });

    await axios.delete(`${this.state.url}/${id}`).catch(e => {
      // console.log(e.message);
      alert(e.response.status === 404 ? "User not found" : "");
    });

    this.getUsers();
  };

  createUser = async data => {
    this.setState({ loader: true });

    await axios
      .post(this.state.url, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        position: {id:data.position.id},
        role:{id:data.role.id}
      })
      .catch(e => {
        // console.log(e.message)
        alert(e.response.status === 500 ? "Email already exists" : "");
      });

    this.getUsers();
  };

  editUser = async data => {
    // clear customer obj
    this.setState({ user: {} });

    this.setState({ loader: true });

    await axios
      .put(`${this.state.url}/${data.id}`, {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: {id:data.role.id},
        position: data.position,
      })
      .catch(e => {
        console.log(e.message);
      });

    this.getUsers();
  };

  componentDidMount0() {
    this.getUsers();
  }

  componentDidMount(){
    axios.get(this.state.url)
    .then( response => {
      this.setState( {users: response.data ,
                      loader: false});
    })
    .catch( error => {
      console.log(error);
    });
  }

  onDelete = id => {
    // console.log("app ", id);
    this.deleteUser(id);
  };

  onEdit = data => {
    console.log("app", data);
    this.setState({ user: data });
  };

  onFormSubmit = data => {
    console.log("app ", data);
    // return;
    // console.log("app ", data);
    if (data.isEdit) {
      // if is edit true
      this.editUser(data);
    } else {
      // if is edit false
      this.createUser(data);
    }
  };

  render() {
    return (
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Manage <b>User</b></h2>
                </div>
                <div className="col-sm-6"> 
                  <button  className="btn btn-sm btn-success" data-toggle="modal"> <span>Add New User</span></button>
                  <button  className="btn btn-sm btn-danger" data-toggle="modal"><i className="bi-alarm"></i> <span>Delete</span></button>
                </div>
              </div>
            </div>
            

            <div >
              <MyForm
                onFormSubmit={this.onFormSubmit}
                user={this.state.user}
              />
              {this.state.loader ? <Loader /> : ""}
              <UserList
                users={this.state.users}
                onDelete={this.onDelete}
                onEdit={this.onEdit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
