import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <FontAwesomeIcon onClick={onLogout} icon="arrow-right-from-bracket" />
  // return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
