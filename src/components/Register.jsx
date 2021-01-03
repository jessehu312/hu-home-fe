import React from 'react';
import { useConfig } from '../context/ConfigProvider';
import './Register.css';
import Button from "./Button";

const Register = (props) => {
  const { config: { firebaseClient } } = useConfig();
  const { currentUser: { email, id }} = props;

  return (
    <div className="container">
      <div className="navheader">
        <a className="back" onClick={async () => { await firebaseClient.auth().signOut(); }}>Back</a>
        <h1 className="myHome">My Home(s)</h1>
      </div>
      <form className="registration">
        <ul>
          <li>
            <p>Personal Contact:</p>
            <input className="field-style field-split align-left" placeholder="Name:" />
          </li>             
          <li>      
            <input className="field-style field-full align-none" placeholder="Phone:" />
          </li>
          <li>
            <p>Location:</p>
            <input className="field-style field-split align-left" placeholder="City:" />
            <input className="field-style field-split align-right" placeholder="Zip/Postal Code:" />
          </li>
          <li display="block">
            <input className="field-style field-full align-none" placeholder="Address:"/>
          </li>
        </ul>
        </form>
      <Button>
        Add Another Address
      </Button>
      <Button primary>
        Save Details
      </Button>
    </div>
  );
};

export default Register;