import React, { Component } from "react";

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this, 'Parameter');
        this.state = {
            isEditing: false,
            forms: [],
            form: {
                Id:1,
                Name: 'John White',
                Description: 'john.white@gmail.com',
                Label: 'Testing Api',
                Type: 'Xy34#4'
            }
        };
    }

    componentDidMount() {
        let url = 'https://codepen.io/jobs.json';
        let init_data = {
            FullName: 'John White',
            EmailAddress: 'john.white@gmail.com',
            Message: 'Testing Api',
            Captcha: 'Xy34#4'
        };
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState(init_data)
            })
            .catch(error => {
                console.log(error);
                this.setState(init_data);
            });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    handleChange(event) {
        /*
          match corresponding values in state
        */
        event.preventDefault();
        let state = { [event.target.name]: event.target.value };
        this.setState(state);
        console.log(event);
        console.log(event);
    }

    handleClick(param, e) {
        var isEditing = !this.state.isEditing;
        this.setState({isEditing: isEditing});
        console.log(this.state.isEditing);
        console.log('Parameter', param);
        console.log('Event', e);
      }

    render() {
        if (this.state.isEditing) {
            return (
                <div>
                    <h1>Edit Forms</h1>
                    <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, 0)}>Save</button></p></div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h3 style={{ textAlign: "underline" }}>{this.state.form.Name}</h3>
                        <div>{this.state.form.Description}</div>
                        <div><p>Label: {this.state.form.Label}</p></div>
                        <div><p>Type: {this.state.form.Type}</p></div>
                        <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, this.state.form.Id)}>Edit </button></p></div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            );
        }
    }
}

export default Forms;