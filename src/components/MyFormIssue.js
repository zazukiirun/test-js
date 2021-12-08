import React, { Component } from "react";
import axios from "axios";

class MyFormIssue extends Component {
    state = {
        form: {
            title: "",
            description: "",
            attachment: "",
            createDate: "",
            updateDateTime: "",
            assignTo: { id: 1, firstName: "" },
            createBy: { id: 1, firstName: "" },
            status: { id: 1, name: "" },
            type: { id: 1, name: "" },
            user: { id: 1, firstName: "" },
            isEdit: false,
        },
        btnName: "Save",
        btnClass: "ui primary button submit-button",
        userUrl: "/api/user",
        users: [],
        statusUrl: "/api/status",
        statuss: [],
        typeUrl: "/api/type",
        types: [],
    };

    isEmptyObj(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidMount() {
        console.log("componentDidMount in MyFormIssue");
        axios
            .get(this.state.userUrl)
            .then((response) => {
                this.setState({ users: response.data, loader: false });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(this.state.statusUrl)
            .then((response) => {
                this.setState({ statuss: response.data, loader: false });
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(this.state.typeUrl)
            .then((response) => {
                this.setState({ types: response.data, loader: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmptyObj(this.props.issue)) {
            this.setState({
                form: { ...this.props.issue, isEdit: true },
                btnName: "Update",
                btnClass: "ui orange button submit-button",
            });
            // console.log("update");
        }
    }

    onFormSubmit = (event) => {
        // prevent form submit
        event.preventDefault();

        // form validation
        if (this.formValidation()) {
            // send form data to app
            this.props.onFormSubmit(this.state.form);

            // change the button to save
            this.setState({
                btnName: "Save",
                btnClass: "ui primary button submit-button",
            });

            // clear form fields
            this.clearFormFields();
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        let form = this.state.form;
        if (event.target.type === "text") {
            form[name] = value;
        } else {
            form[name].id = value;
        }
        this.setState({ form });
    };

    formValidation = () => {
        // title
        if (document.getElementsByName("title")[0].value === "") {
            alert("Enter title");
            return false;
        }

        // description
        if (document.getElementsByName("description")[0].value === "") {
            alert("Enter description");
            return false;
        }

        // attachment
        if (document.getElementsByName("attachment")[0].value === "") {
            alert("Enter attachment");
            return false;
        }

        return true;
    };

    clearFormFields = () => {
        // console.log("clear");
        // change form state
        this.setState({
            form: {
                title: "",
                description: "",
                attachment: "",
                createDate: "",
                updateDateTime: "",
                assignTo: { id: 1 },
                createBy: { id: 1 },
                status: { id: 1 },
                type: { id: 1 },
                user: { id: 1 },
                isEdit: false,
            },
        });

        // clear form fields
        document.querySelector(".form").reset();
    };

    render() {
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.form.title}
                        />
                    </div>
                    <div className="four wide field">
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleChange}
                            value={this.state.form.description}
                        />
                    </div>
                    <div className="six wide field">
                        <label>attachment:</label>
                        <input
                            type="text"
                            name="attachment"
                            placeholder="Attachment"
                            onChange={this.handleChange}
                            value={this.state.form.attachment}
                        />
                    </div>

                    <div className="four wide field">
                        <label>Assign to:</label>
                        <select
                            name="assignTo"
                            id="assignTo"
                            value={this.state.form.assignTo.id}
                            onChange={this.handleChange}
                        >
                            {this.state.users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.firstName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="four wide field">
                        <label>Create by:</label>
                        <select
                            name="createBy"
                            id="createBy"
                            value={this.state.form.createBy.id}
                            onChange={this.handleChange}
                        >
                            {this.state.users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.firstName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="four wide field">
                        <label>Status:</label>
                        <select
                            name="status"
                            id="status"
                            value={this.state.form.status.id}
                            onChange={this.handleChange}
                        >
                            {this.state.statuss.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="four wide field">
                        <label>Type:</label>
                        <select
                            name="type"
                            id="type"
                            value={this.state.form.type.id}
                            onChange={this.handleChange}
                        >
                            {this.state.types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
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

export default MyFormIssue;
