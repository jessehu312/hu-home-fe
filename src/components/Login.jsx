import React, { useState } from 'react';
import { useConfig } from '../context/ConfigProvider';
import Button from './Button';
import './TextInput.css';
import logo from './home.png';

const Login = (_) => {
  const { config: { firebaseClient } } = useConfig();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="App">
      <div class="container">
        <h1>
          Hu Home
        </h1>
      <div>
        <img src={logo} width="96px" height="96px" position="absolute" />
      </div>
        <form>
          <div class="group">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'}/>
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div class="group">
            <input type={'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder={'Password'}/>
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
        </form>
      <div>
        <a>
          Forgot Password?
        </a>
      </div>
      <Button onClick={ async () => { await firebaseClient.auth().createUserWithEmailAndPassword(email, pass); }} primary>
        Sign Up
      </Button>
      <Button onClick={ async () => { await firebaseClient.auth().signInWithEmailAndPassword(email, pass);}} secondary>
        Log in
      </Button>
      </div>
    </div>
  );
};

export default Login;
