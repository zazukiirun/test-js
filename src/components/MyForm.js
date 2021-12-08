import React, { Component } from "react";
import axios from 'axios';
class MyForm extends Component {
  state = {
    form: { firstName: "", lastName: "", email: "", role: { id: 1, name: '' },position:{id:1},isEdit: false },
    btnName: "Save",
    btnClass: "ui primary button submit-button",
    positions: [],
    positionUrl: '/api/position',
    roles: [],
    roleUrl: '/api/role'
  };

  isEmptyObj(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  componentDidMount() {
    console.log('componentDidMount in MyForm')
    axios.get(this.state.positionUrl)
      .then(response => {
        this.setState({
          positions: response.data,
          loader: false
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios.get(this.state.roleUrl)
      .then(response => {
        this.setState({
          roles: response.data,
          loader: false
        });
      })
      .catch(error => {
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
    console.log('MyForm onFormSubmit');
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
    if (event.target.type === 'text') {
      form[name] = value;
    } else {
      form[name].id = value;
    }
    this.setState({ form });
  };

  formValidation = () => {
    // first name
    if (document.getElementsByName("firstName")[0].value === "") {
      alert("Enter first name");
      return false;
    }

    // last name
    if (document.getElementsByName("lastName")[0].value === "") {
      alert("Enter last name");
      return false;
    }

    // email
    if (document.getElementsByName("email")[0].value === "") {
      alert("Enter email");
      return false;
      
    }
      return true;
  };

  clearFormFields = () => {
    // console.log("clear");
    // change form state
    this.setState({
      form: { firstName: "", lastName: "", email: "", role: { id: 1 }, position:{id:1}, isEdit: false }
    });

    // clear form fields
    document.querySelector(".form").reset();
  };

  render() {
    return (
      <form className="ui form">
        <div className="fields">
          <div className="four wide field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.form.firstName}
            />
          </div>

          <div className="four wide field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.form.lastName}
            />
          </div>

          <div className="six wide field">
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="joe@schmoe.com"
              onChange={this.handleChange}
              value={this.state.form.email}
            />
          </div>
          
          <div className="four wide field">
          <label for="position">position:</label>
          <select id="position.id" name="position" value={this.state.form.position.id} onChange={this.handleChange}>
            {this.state.positions.map((position) => (
              <option key={position.id} value={position.id}>
                {''}
                {position.name}
              </option>
            ))}
          </select>
       
        </div>

          <div className="four wide field">
          <label for="role">Role:</label>
          <select id="role.id" name="role" value={this.state.form.role.id} onChange={this.handleChange}>
            {this.state.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {''}
                {role.name}
              </option>
            ))}
          </select>
        </div>

        </div>        

        <div className="two wide field">
          <button className={this.state.btnClass} onClick={this.onFormSubmit}>
            {this.state.btnName}
          </button>
        </div>

      </form>
    );
  }
}

export default MyForm;