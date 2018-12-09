import React from "react";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                FullName: '',
                EmailAddress: '',
                Message: '',
                Captcha: ''
            };
    }

    componentWillMount() {
        let url = 'https://codepen.io/jobs.json';
        let init_data = {
            FullName: 'John White',
            EmailAddress: 'john.white@gmail.com',
            Message: 'Testing Api',
            Captcha: 'Xy34#4'
        };
        fetch(url)
        .then(response => response.json())
        .then(data => 
            {
                //console.log(init_data);
                //this.setState(init_data)
                //console.log(this.state);
                //console.log(this.props);
        })
        .catch(error => 
            {
                //console.log(error);
                //this.setState(init_data);
            });
      }

    handleSubmit(event) {
        //console.log(this.state);
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
            <div>
                <div className="row">
                    <div className="col-md-2 col-sm-0"></div>
                    <div className="col-md-8 col-sm-12"><h3 style={{ textAlign: "underline" }}>Contact Us</h3></div>
                    <div className="col-md-2 col-sm-0"></div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-sm-0"></div>
                    <div className="col-md-8 col-sm-12">
                        <div className="jumbotron text-center">
                            <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-row text-left">
                                    <div className="form-group col-lg-12">
                                        <div className="input-icon">
                                            <label>*Your Full Name:</label>
                                            <input type="text" id="FullName" name="FullName" className="form-control input-md" required placeholder="*Your Full Name" required value={this.state.FullName} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row text-left">
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="input-icon">
                                            <label>*Your Email Address:</label>
                                            <input type="email" id="EmailAddress"  className="form-control" required placeholder="*Your Email Address" value={this.state.EmailAddress} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="form-row text-left">
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="input-icon">
                                            <label>*Your Message:</label>
                                            <textarea rows="5" id="Message" name="Message" className="form-control" required placeholder="*Your Message" value={this.state.Message} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row text-left">
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="input-icon">
                                            <label ><img src="http://members.itcareercoach.com/signups/showcaptcha" title="Enter  Captcha" alt="Enter  Captcha" /> *Enter captcha below &darr;</label>
                                            <input type="text" id="Captcha" name="Captcha" className="form-control" required placeholder="*Enter Captcha" value={this.state.Captcha} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <footer> <button className="btn btn-lg btn-info btn-block" type="submit">&raquo;&nbsp;Contact&nbsp;&laquo;</button></footer>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-0"></div>
                </div>
            </div>
        );
    }
}

export default Contact;