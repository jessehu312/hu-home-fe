import React, {useState} from 'react';
import { useConfig } from '../context/ConfigProvider';
import './Register.css';
import Button from "./Button";
import { useCurrentUser } from '../context/UserProvider';

const Save = (name, phone, city, zip, address, location, locationDetails, firebaseClient) => {
  const {latitude, longitude } = location.location;
  const country = locationDetails.addresses[0].country;
  return firebaseClient.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => fetch(
      '/api/family', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({name, phone, city, zip, address, country, longitude, latitude})
      }
    ))
    .then(_=>window.location.href = '/')
}

const Register = (props) => {
  const { currentUser, location, locationDetails, debug } = useCurrentUser();
  const { config: { firebaseClient } } = useConfig();
  const { currentUser: { email, id }} = props;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');

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
            <input className="field-style field-split align-left" placeholder="Name:" value={name} onChange={(e) => setName(e.target.value)}/>
          </li>             
          <li>      
            <input className="field-style field-full align-none" placeholder="Phone:" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </li>
          <li>
            <p>Location:</p>
            <input className="field-style field-split align-left" placeholder="City:" value={city} onChange={(e) => setCity(e.target.value)}/>
            <input className="field-style field-split align-right" placeholder="Zip/Postal Code:" value={zip} onChange={(e) => setZip(e.target.value)}/>
          </li>
          <li display="block">
            <input className="field-style field-full align-none" placeholder="Address:" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </li>
        </ul>
        </form>
      <Button>
        Add Another Address
      </Button>
      <Button onClick={() => {Save(name, phone, city, zip, address, location, locationDetails, firebaseClient) }} primary>
        Save Details
      </Button>
    </div>
  );
};

export default Register;