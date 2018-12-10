import React from "react";
import database from "../Data/LocalStorageData";

const DATA_KEYID = 'Forms';
const EDIT_MODES = 
{
    NONE: "None",
    EDIT: "Editing",
    DELETE: "Deleting",
    ADD: "Adding"
  };
  
class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this, 'Parameter');
        this.state = {
            isEditing: false,
            editMode: EDIT_MODES.NONE,
            forms: [],
            form: {
                Id: 0,
                Name: '',
                Description: '',
                Label: '',
                Type: ''
            }
        };
    }

    componentWillMount() {
    
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

        //let min = 0, max = init_data.length - 1;
        //let formId = Math.floor(Math.random() * (max - min + 1)) + min;
        let data = database.fetch(DATA_KEYID);
        console.log(data);
        let form = data[0];
        let state = { forms: data, form: data[0] };
        //console.log(data);
        this.setState(state);
        //console.log(state);
        /*
        data
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState(state);
            })
            .catch(error => {
                console.log(error);
                this.setState(init_data);
            });
            */
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    handleChange(event) {
        event.preventDefault();
        //let state = { [event.target.name]: event.target.value };

        let stateCopy = Object.assign({}, this.state);
        stateCopy.form[event.target.name] = event.target.value;

        console.log(stateCopy);
        this.setState(stateCopy);
        //this.setState(state);
    }

    handleClick(param, e) {
        var isEditing = !this.state.isEditing;
        this.setState({ isEditing: isEditing, editMode: EDIT_MODES.EDIT });

        let form = this.getForm(e);
        //console.log({ e: e, param: param });

        if (form != null) {
            //console.log(form);
            //console.log('Event', e);
            this.setState({ form: form });
        }
        if (e === 0) {
            //let form = this.getRandomForm();
            //this.setState({ form: form });
        }
    }

    handleSave(){
        let data =  database.fetch(DATA_KEYID);
        let form = this.state.form;
        let id = this.state.form.Id;

        if(this.state.editMode === EDIT_MODES.ADD){
            console.log('handleSave: ');
            database.save(DATA_KEYID, this.state.form);
            let forms = database.fetch(DATA_KEYID);
            this.setState({forms: forms});
        }
        else if(this.state.editMode === EDIT_MODES.EDIT){
            data = form;
            database.save(DATA_KEYID, [this.state.form]);
            console.log(this.state);
        }
        this.setState({isEditing: false, editMode: EDIT_MODES.NONE});
        console.log(this.state);
    }

    handleCancel() {
        this.setState({ isEditing: false,  editMode: EDIT_MODES.NONE});
    }

    handleDelete(param, e) {
        this.setState({isEditing: true,  editMode: EDIT_MODES.DELETE });
        console.log("handleDelete");
        console.log(this.state);
    }

    handleAddNew(param, e) {
        this.setState(
            {
                isEditing: true,
                editMode: EDIT_MODES.ADD,
                form:
                {
                    Id: 0,
                    Name: '',
                    Description: '',
                    Label: '',
                    Type: ''
                }
            });

        console.log('Add New: ');
        console.log(this.state);
    }

    getForm(id) {
        let form = null;
        for (let f = 0; f < this.state.forms.length; f++) {
            if (id === this.state.forms[f].Id) {
                form = this.state.forms[f];
                break;
            }
        }
        return form;
    }

    render() {
        if (this.state.isEditing) {
            return (
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div>
                            <h2>Manage Forms</h2>
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
                            <div className="row">
                                <div className="col-sm-6"><button id="Save" name="Save1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleSave.bind(this, 0)}>Save</button></div>
                                <div className="col-sm-6"><button id="Cancel" name="Cancel1" type="button" className="btn btn-sm btn-default btn-block" onClick={this.handleCancel.bind(this, 0)}>Cancel</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            )
        }
        else {
            const forms = this.state.forms.map((item) =>
                <div className="row" key={item.Id}>
                    <div className="col-md-8">
                        <div style={{ textAlign: 'underline', fontWeight: 'bold' }}>{item.Name}</div>
                        <div>{item.Description}</div>
                        <div>Label: {item.Label}</div>
                        <div>Type: {item.Type}</div>
                        <div><p></p></div>
                    </div>
                    <div className="col-md-2"> <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, item.Id)}>Edit </button></p></div></div>
                    <div className="col-md-2"> <div><p><button id="Delete" name="Delete1" type="button" className="btn btn-sm btn-default btn-block" onClick={this.handleDelete.bind(this, item.Id)}>Delete</button></p></div></div>
                </div>
            );

            return (
                <div className="container">
                    <div className="row"><div className="col-md-8"><h2>All Forms</h2></div> <div className="col-md-4"><button id="AddNew" name="AddNew" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleAddNew.bind(this, 0)}>Add New </button></div></div>
                    <div className="row"><div className="col-md-12"><div><hr /></div></div></div>
                    <div className="row">
                        <div className="col-md-12">
                            {forms}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Forms;