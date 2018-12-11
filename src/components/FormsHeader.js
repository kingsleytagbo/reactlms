import React from "react";
const EDIT_MODES =
{
    NONE: "None",
    EDIT: "Editing",
    DELETE: "Deleting",
    ADD: "Adding"
};

export default class FormsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editMode: props.editMode };
    }

    componentWillReceiveProps = (props) => {
        if (props.editMode) {
            this.setState({editMode: props.editMode});
        }
    };

    render() {
        if (this.state.editMode === EDIT_MODES.NONE) {
            return (
                <h3>
                    All Forms
                </h3>
            )
        }
        else if (this.state.editMode === EDIT_MODES.DELETE) {
            return (
                <h3>
                    Confirm Delete?
                </h3>
            )
        }
        else if (this.state.editMode === EDIT_MODES.ADD) {
            return (
                <h3>
                    Add New Form
                </h3>
            )
        }
        else if (this.state.editMode === EDIT_MODES.EDIT) {
            return (
                <h3>
                    Edit Form
                </h3>
            )
        }
        else {
            return (
                <h3>
                    Manage Form
                </h3>
            )
        }
    }
}