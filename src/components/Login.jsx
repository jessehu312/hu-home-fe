import React, { useState } from 'react';
import { useConfig } from '../context/ConfigProvider';

const Login = (_) => {
  const { config: { firebaseClient } } = useConfig();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
      <input type={'password'} value={pass} onChange={(e) => setPass(e.target.value)} placeholder={'Password'} />
      <button onClick={ async () => { await firebaseClient.auth().createUserWithEmailAndPassword(email, pass); }}>
        Create account
      </button>
      <button onClick={ async () => { await firebaseClient.auth().signInWithEmailAndPassword(email, pass); }}>
        Log in
      </button>
    </div>
  );
};

export default Login;