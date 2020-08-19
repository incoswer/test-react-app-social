import React, {useEffect, useState} from 'react';



const ProfileStatusWithHooks = (props) => {

    let [editMode,setEditMode] = useState(false)
    let [status, setStatus] =useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const activateMode=()=>{
        setEditMode(true)
    }
    const deActivateEditMode = () =>{
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }
    return (
        <>
            {!editMode &&
                    <span onDoubleClick={activateMode} >{props.status ? props.status: <span>-----</span>}</span>
            }
            {editMode &&
                    <input onBlur={deActivateEditMode}
                           onChange={onStatusChange} autoFocus={true} value={status} />
            }
        </>
    );


}

export default ProfileStatusWithHooks