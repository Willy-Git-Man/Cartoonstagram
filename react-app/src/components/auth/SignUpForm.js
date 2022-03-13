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
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password)
      formData.append("profile_img_src", profile_img_src)

      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    }else{
      setErrors(['Passwords do not match.'])
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
    const file = e.target.files[0];
    // console.log(file, '========')
    setProfilePicUrl(file)
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
            className='loginInputs fileChooseInput'
            type='file'
            id='chooseFileInput'
            accept='image/*'
            name='img_src'
            onChange={updateProfilePic}
            hidden='hidden'
          ></input>
          <div className='chooseFileNameAndLabel'>
            <label htmlFor='chooseFileInput' className='chooseFileInputCss' type='button'>Choose file...</label>
            <div className='nameOfFileForChooseInput'>{profile_img_src ? profile_img_src.name : ''}</div>
          </div>
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
