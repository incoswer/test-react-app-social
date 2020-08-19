import React,{PureComponent} from 'react';
import css from './MyPosts.module.css';
import Post from './Post/Post';
import {updateNewPostTextActionCreator, addPostActionCreator} from '../../../redux/profile-reducer';
import {Field, reduxForm} from "redux-form";
import {maxLength30, maxLengthCreator, required} from "../../../utils/validations/validations";
import {Textarea} from "../../common/FormsControls/FormsControls";

window.props=[]
window.nextprops=[]
class MyPosts extends PureComponent {

    render() {
        window.props.push(this.props)

        let postsElements = [...this.props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.title} likesCount={p.likesCount}/>);
        let newPostElement = React.createRef();

        let onAddPost = () => {
            this.props.addPost();
        }
        let onPostChanged = () => {
            let text = newPostElement.current.value;
            this.props.updateNewPostText(text);
        }
        let newPost = (post) => {
            this.props.addPost(post.newPost)
        }
        return (
            <div className={css.posts}>
                <MyPostsReduxForm onSubmit={newPost}/>
                <div className={css.publicate}>
                    {postsElements}
                </div>
            </div>
        );
    }
}

let maxLength10 = maxLengthCreator(10);
const MyPostsRedux = (props) =>{
    return <div>
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} disabled={true} placeholder={'write post here'} name={'newPost'}
            validate={[required,maxLength10]} />
            <button>Publish</button>
        </form>
    </div>
}
const MyPostsReduxForm = reduxForm({form:'newPost'})(MyPostsRedux)
export default MyPosts;