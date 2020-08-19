import React from "react";
import css from './FormsControls.module.css';

export const FormControl = ({input, meta, child,element, props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + " " + (hasError ? css.error: '')}>
            <div>
                <textarea {...input} {...props} placeholder={'area for write'}/>
            </div>
            { hasError &&
            <span>
                {meta.error}
            </span>}
        </div>)
}

export const Textarea = ({input, meta, props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + " " + (hasError ? css.error: '')}>
            <div>
                <textarea {...input} {...props} placeholder={'area for write'}/>
            </div>
            { hasError &&
            <span>
                {meta.error}
            </span>}
        </div>)
}
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.formControl + " " + (hasError ? css.error: '')}>
            <div>
                <input {...input} {...props} />
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>)
}
