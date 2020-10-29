import React, {ChangeEvent} from 'react';
import PreLoader from "../../common/PreLoader/PreLoader";

type propsType = {
    status: string;
    updateStatus: (status: string) => void
}
type stateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<propsType, stateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });

    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div> :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </>
        );
    }

}

export default ProfileStatus;