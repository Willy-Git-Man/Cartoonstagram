import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './loginSignup.css'
import { userFollowers } from '../../store/followers';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_img_src, setProfilePicUrl] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_img_src));
      if (data) {
        setErrors(data)
      }
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePicUrl(e.target.value)
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='wholeDivSignUp'>

    <div className='signupForm'>
      <div>
      <h2 className='signupTitle'>Cartoonstagram</h2>
      <h5 className='signUpMessage'>Sign up to see photos of your friends.</h5>
      </div>
      <form className='formSignUp' onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
          <input
            className='loginInputs'
            placeholder='Username'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            ></input>
        </div>
        <div>
          <input
            className='loginInputs'
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            ></input>
        </div>
        <div>
          <input
            className='loginInputs'
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
        </div>
        <div>
          <input
            className='loginInputs'
            placeholder='Confirm Password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></input>
        </div>
        <div>
          <input
          placeholder='Profile Picture URL'
          type='text'
          name='profile_pic'
          onChange={updateProfilePic}
          value={profile_img_src}
          ></input>
        </div>
        <button className='loginButtons singupButton' type='submit'>Sign Up</button>
      </form>
    </div>
      <div className='lowerSignUp'>
        <p className='text'>Have an account?</p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default SignUpForm;
