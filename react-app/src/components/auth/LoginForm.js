import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginSignup.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login('demo@aa.io','password'))
  }

  return (
    <div className='loginDiv'>
      <img className='loginPic' src='https://www.thesun.co.uk/wp-content/uploads/2020/06/gramgram.png' alt='Broken Link'/>
      <div>

      <div className='rightDiv'>
      <h3 className='loginTitle'>Cartoonstagram</h3>
      <form className='formDiv' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
          <input
            className='loginInputs'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            />
        </div>
        <div>
          <input
            className='loginInputs'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            />
        </div>
        <div className='buttonsDiv'>
          <div>
            <button className='loginButtons' type='submit'>Login</button>
          </div>
          <div>
            <button className='loginButtons' onClick={demoUser}>
              Demo User
            </button>
          </div>
        </div>
      </form>
      </div>
      <div className='signUpOption'>
        <p className='text'>
        Don't have an account?
        </p>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
