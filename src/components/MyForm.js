import React, { Component } from "react";
import axios from 'axios';
class MyForm extends Component {
  state = {
    form: { firstname: "", lastname: "", email: "",position:"",role: {id= 1}, isEdit: false },
    btnName: "Save",
    btnClass: "ui primary button submit-button",
    position:[],
    positionUrl ='',
    role:[],
    roleUrl = ''
  };

  isEmptyObj(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
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





  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.isEmptyObj(this.props.user)) {
      this.setState({
        form: { ...this.props.user, isEdit: true },
        btnName: "Update",
        btnClass: "ui orange button submit-button"
      });
      // console.log("update");
    }
  }

  onFormSubmit = event => {
    // prevent form submit
    event.preventDefault();

    // form validation
    if (this.formValidation()) {
      // send form data to app
      this.props.onFormSubmit(this.state.form);

      // change the button to save
      this.setState({
        btnName: "Save",
        btnClass: "ui primary button submit-button"
      });

      // clear form fields
      this.clearFormFields();
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    let form = this.state.form;
    if(event.target.type='text'){
      form[name] = value;
    }else{
      form[name].id = value;
    }


    form[name] = value;
    this.setState({ form });
  };

  formValidation = () => {
    // first name
    if (document.getElementsByName("firstname")[0].value === "") {
      alert("Enter first name");
      return false;
    }

    // last name
    if (document.getElementsByName("lastname")[0].value === "") {
      alert("Enter last name");
      return false;
    }

    // email
    if (document.getElementsByName("email")[0].value === "") {
      alert("Enter email");
      return false;
    }
    // if (document.getElementsByName("position")[0].value === "") {
    //   alert("Enter position");
    //   return false;
    // }

    // if (document.getElementsByName("role")[0].value === "") {
    //   alert("Enter role");
    //   return false;
    // }
    return true;
  };

  clearFormFields = () => {
    // console.log("clear");
    // change form state
    this.setState({
      form: { firstname: "", lastname: "", email: "", position:"", role:"", isEdit: false }
    });

    // clear form fields
    document.querySelector(".form").reset();
  };

  render() {
    return (
      <form className="ui form">
        <div className="fields">
          <div className="four wide field">
            <label>First name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.form.firstname}
            />
          </div>

          <div className="four wide field">
            <label>Last name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.form.lastname}
            />
          </div>

          <div className="six wide field">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="joe@schmoe.com"
              onChange={this.handleChange}
              value={this.state.form.email}
            />
          </div>

          {/* <div className="seven wide field">
            <label>Position</label>
            <input
              type="tye"
              name="position"
              placeholder="number key"
              onChange={this.handleChange}
              value={this.state.form.position}
            />
          </div> */}

           {/* <div className="eight wide field">
            <label>role</label>
            <input
              type="text"
              name="role"
              placeholder="number key"
              onChange={this.handleChange}
              value={this.state.form.role}
            />
          </div> */}

          <div className="seven wide field">
          <label for="positon" type="position">
            Position:
          </label>
          <select id="position" name="position" 
              onChange={this.handleChange}>
          <option value="null" className ="posotion">--Select position name--</option>
            <option value="developer">Developer</option>
            <option value="tester">Tester</option>
            <option value="project manager">Project Manager</option>

            <optgroup label="etc.">
            <option value="...">Database Management</option>
            <option value="...">IT Management</option>
          </optgroup>
          </select>
          </div>

          <div className="eight wide field">
          <label for="role" type="role">
            Role:
          </label>
          <select id="role" name="role" onChange={this.handleChange}>
          <option value={this.state.form.role.id} className ="role">--Select role name--</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          
          <optgroup label="etc.">
            <option value="3">...</option>
            <option value="4">...</option>
          </optgroup>
          </select>
          </div>


          <div className="two wide field">
            <button className={this.state.btnClass} onClick={this.onFormSubmit}>
              {this.state.btnName}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MyForm;