import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  onDelete = id => {
    // console.log("customer list ", id);
    this.props.onDelete(id);
  };

  onEdit = id => {
    // console.log("customer list ", id);
    this.props.onEdit(id);
  };

  render() {
    const users = this.props.users;
    return (
      <div className="data2">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "50px", textAlign: "center" }}>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th style={{ width: "250px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => {
              return (
                <User
                  key={user.id}
                  user={user}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
