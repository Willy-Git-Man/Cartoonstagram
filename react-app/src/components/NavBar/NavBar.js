
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>

      <NavLink to='/' exact={true} activeClassName='active'>Home</NavLink>

      <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>

      <LogoutButton />


    </nav>
  );
}

export default NavBar;
