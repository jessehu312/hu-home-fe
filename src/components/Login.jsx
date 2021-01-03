import React, { useState } from 'react';
import { useConfig } from '../context/ConfigProvider';
import Button from './Button';
import './Login.css';
import logo from './home.png';

const Login = (_) => {
  const { config: { firebaseClient } } = useConfig();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
      <div className="container">
      <div className="header-container">
          <h1>
            Hu Home
          </h1>
      </div>
      <div>
        <img src={logo} width="96px" height="96px" position="absolute" />
      </div>
        <form>
          <div className="group">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} className="line"/>
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
          <div className="group">
            <input type={'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder={'Password'} className="line"/>
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
        </form>
      <div>
        <a className="forgot">
          Forgot Password?
        </a>
      </div>
      <Button onClick={ async () => { await firebaseClient.auth().createUserWithEmailAndPassword(email, pass);}} primary>
        Sign Up
      </Button>
      <Button onClick={ async () => { 
        await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
        }} secondary>
        Log in
      </Button>
      </div>
  );
};

export default Login;
