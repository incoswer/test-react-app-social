import React, {useState} from 'react';
import PreLoader from "../../common/PreLoader/PreLoader";
import img from '../../../images/smalluserimage.jpg'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import css from '../Profile.module.css'
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <PreLoader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const submit =  (formData) => {
         props.saveProfile(formData).then(
             ()=> setEditMode(false)
         )
    }
    return (
        <div>
            <div>
                {props.profile.photos.large ? <img src={props.profile.photos.large}/> :
                    props.profile.photos.small ? <img src={props.profile.photos.small}/> :
                        <img src={img}/>}
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>
            <b>Статус:</b> <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            {editMode ? <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={submit}/> :
                <ProfileData isOwner={props.isOwner} setEditMode={() => setEditMode(true)} profile={props.profile}
                             status={props.status} updateStatus={props.updateStatus}/>}
        </div>
    );
}

const ProfileData = ({setEditMode, isOwner, profile, status, updateStatus}) => {
    return <div>
        <div>
            <div>
                {isOwner && <div>
                    <button onClick={setEditMode}>go to edit mode</button>
                </div>}
                <div>
                    {profile.fullName}
                </div>
                <div>
                    <b>Обо мне:</b>{profile.aboutMe}
                </div>
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(item => <FullContacts key={item} contactTitle={item}
                                                                                          contactValue={profile.contacts[item]}/>)}
            </div>
        </div>
    </div>
}

export const FullContacts = ({contactTitle, contactValue}) => {
    return <div className={css.fullContacts}>
        <b>{contactTitle}:</b> <a href={contactValue}>{contactValue}</a>
    </div>

}
export default ProfileInfo;