import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validations/validations";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import css from '../common/FormsControls/FormsControls.module.css'
import { appStateType } from "../../redux/redux-store";



const LoginForm =({handleSubmit,error,captchaUrl}:any) =>{
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={'input'} validate={required}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={'password'} component={'input'} validate={required} />
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Field placeholder={'captcha'} name={'captcha'} component={Input} validate={required} />}
            {error &&
            <div className={css.formSummerError}>
                {error}
            </div> }
            <div>
                <button>Login</button>
            </div>

        </form>)
}

const LoginReduxForm:any = reduxForm({ form:'login'})(LoginForm)

type mapStateToPropsType={
    captchaUrl:string | null,
    isAuth:boolean,
}


const Login:React.FC<mapStateToPropsType> = (props:any) =>{
    const onSubmit = (formData:any) =>{
        props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    else {
        return <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    }
}
const mapStateToProps = (state:appStateType):mapStateToPropsType=>({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login)