import React from 'react';
import css from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) =>{
	return(
		<div>
			<img src="https://awards.effie.pl/wp-content/uploads/2017/05/effie_www_grafiki_partnerzy_440_mycompany_0.png" />
			The social network
			<div className={css.loginBlock}>
				{props.isAuth ? <div><p>{props.login} </p><button onClick={props.logout}>Log out</button></div>:
				<NavLink to={'/login'}>Login</NavLink>}
			</div>

		</div>
	);
}
export default Header;