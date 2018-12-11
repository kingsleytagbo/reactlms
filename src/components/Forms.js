import ReactDOM from 'react-dom';
import React from "react";
import database from "../Data/LocalStorageData";
import FormsHeader from "../components/FormsHeader";

const DATA_KEYID = 'Forms';
const EDIT_MODES =
{
    NONE: "None",
    EDIT: "Editing",
    DELETE: "Deleting",
    ADD: "Adding"
};
const invalidFeedbackStyle = {
    display: 'block'
};

class Forms extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this, 'Parameter');
        this.handleDelete = this.handleDelete.bind(this, 'Parameter');

        this.state = {
            isEditing: false,
            editMode: EDIT_MODES.NONE,
            forms: [],
            form: database.getModel(),
            errors: {
                Name: { valid: true, text: '' },
                Description: { valid: true, text: '' }
            }
        };
    }

    componentWillMount() {
        //use this to remove all data in storage
        //database.removeAll(DATA_KEYID);
        let data = database.fetch(DATA_KEYID);
        let form = database.getModel();
        let state = { forms: data, form: form };
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.Name).value;
        if (!name || name.length === 0) {
            return;
        }
    }

    handleChange(event) {
        event.preventDefault();

        let stateCopy = Object.assign({}, this.state);
        stateCopy.form[event.target.name] = event.target.value;

        this.setState(stateCopy);
    }

    handleClick(param, e) {
        var isEditing = !this.state.isEditing;
        this.setState({ isEditing: isEditing, editMode: EDIT_MODES.EDIT });

        let form = this.getForm(e);
        if (form != null) {
            this.setState({ form: form });
        }
    }

    handleDelete(param, e) {
        this.setState({ isEditing: true, editMode: EDIT_MODES.DELETE });
        let form = this.getForm(e);
        if (form != null) {
            this.setState({ form: form });
        }
    }

    handleSave() {
        const form = this.state.form;

        if (this.state.editMode === EDIT_MODES.ADD) {
            if (this.validateForm().isValid) {
                database.save(DATA_KEYID, this.state.form);
                let forms = database.fetch(DATA_KEYID);
                this.setState({ forms: forms, isEditing: false, editMode: EDIT_MODES.NONE });
            }
        }
        else if (this.state.editMode === EDIT_MODES.EDIT) {
            if (this.validateForm().isValid) {
                database.save(DATA_KEYID, this.state.form);
                this.setState({ isEditing: false, editMode: EDIT_MODES.NONE });
            }
        }
        else if (this.state.editMode === EDIT_MODES.DELETE) {
            database.removeOne(DATA_KEYID, form);
            let forms = database.fetch(DATA_KEYID);
            this.setState({ forms: forms, isEditing: false, editMode: EDIT_MODES.NONE });
        }
    }

    handleCancel() {
        this.setState({ isEditing: false, editMode: EDIT_MODES.NONE });
    }

    handleAddNew(param, e) {
        this.setState(
            {
                isEditing: true,
                editMode: EDIT_MODES.ADD,
                form: database.getModel()
            });
    }

    validateForm() {
        let isValid = true;
        let errors = {
            Name: { valid: true, text: '' },
            Description: { valid: true, text: '' }
        };

        const form = this.state.form;
        const name = form.Name;
        const description = form.Description;

        if (!name || name.length === 0) {
            errors.Name.valid = false;
            errors.Name.text = "*Name is required";
            isValid = false;
        }

        if (!description || description.length === 0) {
            errors.Description.valid = false;
            errors.Description.text = "*Description is required";
            isValid = false;
        }

        this.setState({ errors: errors });

        return { isValid: isValid, errors: errors };
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
                            <FormsHeader editMode={this.state.editMode} />
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="jumbotron text-center">
                                        <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                                            <div className="form-row text-left">
                                                <div className="form-group col-lg-12">
                                                    <div className="input-icon">
                                                        <label>*Name:</label>
                                                        <span className="invalid-feedback" style={invalidFeedbackStyle}>{this.state.errors.Name.text}</span>
                                                        <input className={"form-control input-md" + (this.state.errors.Name.valid ? ' is-valid' : ' is-invalid')}
                                                        type="text" id="Name" name="Name" 
                                                        required placeholder="*Name" required value={this.state.form.Name} onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row text-left">
                                                <div className="form-group col-lg-12">
                                                    <div className="input-icon">
                                                        <label>*Description:</label>
                                                        <span className="invalid-feedback" style={invalidFeedbackStyle}>{this.state.errors.Description.text}</span>
                                                        <textarea className={"form-control input-md"  + (this.state.errors.Description.valid ? ' is-valid' : ' is-invalid')}
                                                        id="Description" name="Description" required placeholder="*Description" required value={this.state.form.Description} onChange={this.handleChange.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6"><button id="Save" name="Save1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleSave.bind(this, 0)}>{this.state.editMode === EDIT_MODES.DELETE ? 'Delete' : 'Save'}</button></div>
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
                        <div><p></p></div>
                    </div>
                    <div className="col-md-2"> <div><p><button id="Edit" name="Edit1" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleClick.bind(this, item.Id)}>Edit </button></p></div></div>
                    <div className="col-md-2"> <div><p><button id="Delete" name="Delete1" type="button" className="btn btn-sm btn-default btn-block" onClick={this.handleDelete.bind(this, item.Id)}>Delete</button></p></div></div>
                </div>
            );

            return (
                <div className="container">

                    <div className="row"><div className="col-md-8"> <FormsHeader editMode={this.state.editMode} /></div>
                        <div className="col-md-4"><button id="AddNew" name="AddNew" type="button" className="btn btn-sm btn-info btn-block" onClick={this.handleAddNew.bind(this, 0)}>Add New </button></div></div>
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