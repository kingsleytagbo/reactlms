import React, { Component } from "react";

class Contact extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    handleSubmit(event) {
        if (this.state == null) return;
        console.log('Form value: ' + this.state.inputvalue);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            inputvalue: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Contact Us</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Name</label>
                    <input type="text" value={this.state.inputvalue} onChange={this.handleChange.bind(this)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Contact;