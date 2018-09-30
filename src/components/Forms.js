import React, { Component } from "react";

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this, 'Parameter');
        this.state = {
            isEditing: false,
            forms: [],
            form: {
                Id: 1,
                Name: 'John White',
                Description: 'john.white@gmail.com',
                Label: 'Testing Api',
                Type: 'Xy34#4'
            }
        };
    }

    componentDidMount() {
        let url = 'https://codepen.io/jobs.json';
        let init_data = [
            {
                Id: 1,
                Name: 'John White',
                Description: 'john.white@gmail.com',
                Label: 'Testing Api',
                Type: 'Textbox'
            },
            {
                Id: 2,
                Name: 'Mark Anthony',
                Description: 'mark.anthnony@gmail.com',
                Label: 'Singer',
                Type: 'Textarea'
            },
            {
                Id: 3,
                Name: 'Mary Poppins',
                Description: 'mary.poppins@gmail.com',
                Label: 'Pop Icon',
                Type: 'Hidden'
            }
        ];

        let min = 0, max = init_data.length - 1;
        let formId = Math.floor(Math.random() * (max - min + 1)) + min;
        let form = init_data[formId];
        let state = { forms: init_data, form: form };
        console.log(formId);
        fetch(url)
            .then(response => response.json())
            .then(data => {

                this.setState(state);
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
        event.preventDefault();
        let state = { [event.target.name]: event.target.value };

        let stateCopy = Object.assign({}, this.state);
        stateCopy.form[event.target.name] = event.target.value;

        console.log(stateCopy);
        this.setState(stateCopy);
        //this.setState(state);
    }

    handleClick(param, e) {
        var isEditing = !this.state.isEditing;
        this.setState({ isEditing: isEditing });

        let form = this.getForm(e);

        if(form != null)
        {
            console.log(form);
            console.log('Event', e);
            this.setState({ form: form });
        }
        if (e == 0) {
            //let form = this.getRandomForm();
            //this.setState({ form: form });
        }
    }

    getForm(id) {
        let form = null;
        for(let f = 0; f < this.state.forms.length; f++)
        {
            if(id === this.state.forms[f].Id)
            {
                form = this.state.forms[f];
                break;
            }
        }
        return form;
    }

    getRandomForm() {
        let min = 0, max = this.state.forms.length - 1;
        let formId = Math.floor(Math.random() * (max - min + 1)) + min;
        let form = this.state.forms[formId];
        return form;
    }

    render() {
        if (this.state.isEditing) {
            return (
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div>
                            <h1>Edit Forms</h1>
                            <div className="row">
                                <div className="col-md-2 col-sm-0"></div>
                                <div className="col-md-8 col-sm-12">
                                    <div className="jumbotron text-center">
                                        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                                            <div className="form-row text-left">
                                                <div className="form-group col-lg-12">
                                                    <div className="input-icon">
                                                        <label>*Name:</label>
                                                        <input type="text" id="Name" name="Name" className="form-control input-md" required placeholder="*Name" required value={this.state.form.Name} onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row text-left">
                                                <div className="form-group col-lg-12">
                                                    <div className="input-icon">
                                                        <label>*Description:</label>
                                                        <textarea id="Description" name="Description" className="form-control input-md" required placeholder="*Description" required value={this.state.form.Description} onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, 0)}>Save</button></p></div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            )
        }
        else {
            return this.state.forms.map(item => {
                return (
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h3 style={{ textAlign: "underline" }}>{item.Name}</h3>
                            <div>{item.Description}</div>
                            <div><p>Label: {item.Label}</p></div>
                            <div><p>Type: {item.Type}</p></div>
                            <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, item.Id)}>Edit </button></p></div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                );
            });
        }
    }
}

export default Forms;