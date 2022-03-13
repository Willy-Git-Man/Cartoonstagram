import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostFormModel from './Modals/PostsForm/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar/navBar.css'
import { useSelector } from 'react-redux';
const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav className='navBar'>
      <div>
          <NavLink className='navLinkColor' to='/' exact={true}><h1 className='navTitle'>Cartoonstagram</h1></NavLink>
      </div>
      <div className='navLinks'>
        
          <NavLink to='/' className='navLinkColor' exact={true} activeClassName='active'><FontAwesomeIcon icon="house" /></NavLink>
          <PostFormModel/>
          <LogoutButton />
          <NavLink to={`/users/${currentUser.id}`}>
            <img className='navProfilePic' src={currentUser.profile_img_src} alt='Broken Link'/>
          </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
