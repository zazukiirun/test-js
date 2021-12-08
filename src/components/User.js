import React, { Component } from "react";

class User extends Component {
  onDelete = () => {
    // console.log('customer ', this.props.customer.id);
    this.props.onDelete(this.props.user.id);
  };

  onEdit = () => {
    // console.log('customer ', this.props.customer.id);
    this.props.onEdit(this.props.user);
  };

  render() {
    const { id, firstName,lastName,email} = this.props.user;
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{id}</td>
        <td>{`${firstName} ${lastName}`}</td>
        <td>{email}</td>
        <td>
          <button className="btn m-3 btn-sm btn-warning" onClick={this.onEdit}>
            Edit       
          </button>
          <button className="btn btn-sm btn-danger" onClick={this.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default User;
