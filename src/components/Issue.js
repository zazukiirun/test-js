import React, { Component } from "react";

class Issue extends Component {
    onDelete = () => {
        // console.log('issue ', this.props.issue.id);
        this.props.onDelete(this.props.issue.id);
    };

    onEdit = () => {
        // console.log('issue ', this.props.issue.id);
        this.props.onEdit(this.props.issue);
    };

    render() {
        // console.log("this.props.issue", this.props.issue);
        const {
            id,
            title,
            description,
            attachment,
            createDate,
            updateDateTime,
            assignTo,
            createBy,
            status,
            type,
        } = this.props.issue;
        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td>{attachment}</td>
                <td>{createDate}</td>
                <td>{updateDateTime}</td>
                <td>{assignTo?.firstName} </td>
                <td>{createBy?.firstName}</td>
                <td>{status?.name}</td>
                <td>{type?.name}</td>
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

export default Issue;
