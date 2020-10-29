import React, { Component } from "react";
import ClassDataService from "../services/class.service";

export default class Class extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getClass = this.getClass.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateClass = this.updateClass.bind(this);
        this.deleteClass = this.deleteClass.bind(this);

        this.state = {
            currentClass: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }
    
    componentDidMount() {
        console.log("did the component mount?");
        this.getClass(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentClass: {
                    ...prevState.currentClass,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentClass: {
                ...prevState.currentClass,
                description: description
            }
        }));
    }

    getClass(id) {
        ClassDataService.get(id)
            .then(response => {
                this.setState({
                    currentClass: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentClass.id,
            title: this.state.currentClass.title,
            description: this.state.currentClass.description,
            published: status
        };

        ClassDataService.update(this.state.currentClass.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentClass: {
                        ...prevState.currentClass,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateClass() {
        ClassDataService.update(
            this.state.currentClass.id,
            this.state.currentClass
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The class was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteClass() {
        ClassDataService.delete(this.state.currentClass.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/class')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentClass } = this.state;
        return (
            <div>
                {currentClass ? (
                    <div className="edit-form">
                        <h4>Class</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentClass.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentClass.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentClass.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentClass.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publish
                                </button>
                            )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteClass}
                        >
                            Delete
            </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateClass}
                        >
                            Update
            </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Class...</p>
                        </div>
                    )}
            </div>
        );
    }
}