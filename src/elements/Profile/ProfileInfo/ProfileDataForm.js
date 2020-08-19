import React from 'react'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {FullContacts} from "./ProfileInfo";

import {required} from "../../../utils/validations/validations";
import css from "../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({handleSubmit,profile,error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>save</button>
            {error &&
            <div className={css.formSummerError}>
                {error}
            </div> }
            <div>
                <label>Name:</label>
            <Field type={Textarea} name={'fullName'} component={Input} />
            </div>
            <div>
                <label>About me:</label>
                <Field type={Textarea} name={'aboutMe'} component={Input} />
            </div>
            <div>
                <label>Looking for a job:</label>
                <Field type={'checkbox'} name={'lookingForAJob'} component={Input}/>
            </div>
            <div>
                <label>My professional skills:</label>
                <Field type={Textarea} name={'lookingForAJobDescription'} component={Input} />
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(item => <Field key={item} name={'contacts.'+item} placeholder={item} type={Textarea} component={Input}/>)}
            </div>

        </form>)
}

const ProfileDataReduxForm = reduxForm({form: 'ProfileDataForm'})(ProfileDataForm)

export default ProfileDataReduxForm