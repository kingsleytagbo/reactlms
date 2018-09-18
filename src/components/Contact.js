import React, { Component } from "react";

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                FullName: '',
                EmailAddress: ''
            };
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
    }

    render() {
        return (
            <div className="jumbotron text-center">
                <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                    <header>
                        <h1>Contact Us</h1>
                    </header>

                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="input-icon">
                                <h4>*Your Full Name:</h4>
                                <input type="text" id="FullName" name="FullName" className="form-control" required placeholder="*Your Full Name" required value={this.state.FullName} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="input-icon">
                                <h4>*Your Email Address:</h4>
                                <input type="email" id="EmailAddress" name="EmailAddress" className="form-control" required placeholder="*Your Email Address" value={this.state.EmailAddress} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <footer> <button className="btn btn-lg btn-info btn-block" type="submit">Submit</button></footer>
                </form>
            </div>
        );
    }
}

export default Contact;