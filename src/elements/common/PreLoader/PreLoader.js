import React from "react";
import gif from '../../../images/gif4users.gif'
import css from './PreLoader.module.css'

const PreLoader = () =>{
    return <div className={css.preloader}>
        <img src={gif} />
    </div>
}

export default PreLoader