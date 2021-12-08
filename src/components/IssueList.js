import React, { Component } from "react";
import Issue from "./Issue";

class IssueList extends Component {
    onDelete = (id) => {
        // console.log("issue list ", id);
        this.props.onDelete(id);
    };

    onEdit = (id) => {
        // console.log("issue list ", id);
        this.props.onEdit(id);
    };

    render() {
        const issues = this.props.issues;
        return (
            <div className="data2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: "50px", textAlign: "center" }}>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Attachment</th>
                            <th>CreateDate</th>
                            <th>UpdateDateTime</th>
                            <th>AssignTo</th>
                            <th>CreateBy</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th style={{ width: "250px" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issues.map((issue) => {
                            return (
                                <Issue
                                    key={issue.id}
                                    issue={issue}
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

export default IssueList;
