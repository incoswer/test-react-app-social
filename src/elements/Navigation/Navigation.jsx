import React from 'react';
import css from './Navigation.module.css';
import {NavLink} from 'react-router-dom'

const NavBar = () =>{
	return(
		<div className={css.navigation}>
			<div>
				<NavLink to='/profile' activeClassName={css.active}>Profile</NavLink>
			</div>
			<div>
				<NavLink to="/dialogs" activeClassName={css.active}>Messages</NavLink>
			</div>
			<div>
				<NavLink to="/users" activeClassName={css.active}>Users</NavLink>
			</div>
			<div>
				<NavLink to="/music" activeClassName={css.active}>Music</NavLink>
			</div>
			<div>
				<NavLink to="/news" activeClassName={css.active} >News</NavLink>
			</div>
			<div>
				<NavLink to="/seetings" activeClassName={css.active}>Seetings</NavLink>
			</div>

		</div>
	);
}
export default NavBar;