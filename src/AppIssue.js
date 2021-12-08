import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//import 'semantic-ui-css/semantic.min.css';
import IssueList from "./components/IssueList";
import MyFormIssue from "./components/MyFormIssue";
import axios from "axios";
import Loader from "./Loader";

class AppIssue extends Component {
    state = {
        issues: [],
        loader: false,
        issue: {},
        url0: "http://localhost/laravel-rest-api/public/api/issues",
        url: "/api/issue",
    };

    getIssues = async () => {
        this.setState({ loader: true });
        const issues = await axios.get(this.state.url);
        this.setState({ issues: issues.data, loader: false });
    };

    deleteIssue = async (id) => {
        this.setState({ loader: true });

        await axios.delete(`${this.state.url}/${id}`).catch((e) => {
            // console.log(e.message);
            alert(e.response.status === 404 ? "Issue not found" : "");
        });

        this.getIssues();
    };

    createIssue = async (data) => {
        this.setState({ loader: true });

        await axios
            .post(this.state.url, {
                title: data.title,
                description: data.description,
                attachment: data.attachment,
                createDate: data.createDate,
                updateDateTime: data.updateDateTime,
                assignTo: { id: data.assignTo.id },
                createBy: { id: data.createBy.id },
                status: { id: data.status.id },
                type: { id: data.type.id },
            })
            .catch((e) => {
                // console.log(e.message)
                alert(e.response.status === 500 ? "Title already exists" : "");
            });

        this.getIssues();
    };

    editIssue = async (data) => {
        // clear issue obj
        this.setState({ issue: {} });

        this.setState({ loader: true });

        await axios
            .put(`${this.state.url}/${data.id}`, {
                id: data.id,
                title: data.title,
                description: data.description,
                attachment: data.attachment,
                createDate: data.createDate,
                updateDateTime: data.updateDateTime,
                assignTo: { id: data.assignTo.id },
                createBy: { id: data.createBy.id },
                status: { id: data.status.id },
                type: { id: data.type.id },
            })
            .catch((e) => {
                console.log(e.message);
            });

        this.getIssues();
    };

    componentDidMount0() {
        this.getIssues();
    }

    componentDidMount() {
        axios
            .get(this.state.url)
            .then((response) => {
                this.setState({ issues: response.data, loader: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onDelete = (id) => {
        // console.log("app ", id);
        this.deleteIssue(id);
    };

    onEdit = (data) => {
        // console.log("app ", data);
        this.setState({ issue: data });
    };

    onFormSubmit = (data) => {
        // console.log("app ", data);
        // return;
        // console.log("app ", data);
        if (data.isEdit) {
            // if is edit true
            this.editIssue(data);
        } else {
            // if is edit false
            this.createIssue(data);
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
                                    <h2>
                                        Manage <b>Employees</b>
                                    </h2>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        className="btn btn-sm btn-success"
                                        data-toggle="modal"
                                    >
                                        {" "}
                                        <span>Add New Employee</span>
                                    </button>
                                    <button className="btn btn-sm btn-danger" data-toggle="modal">
                                        <i className="bi-alarm"></i> <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <MyFormIssue
                                onFormSubmit={this.onFormSubmit}
                                issue={this.state.issue}
                            />
                            {this.state.loader ? <Loader /> : ""}
                            <IssueList
                                issues={this.state.issues}
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
export default AppIssue;
