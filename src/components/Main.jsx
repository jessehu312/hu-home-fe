import { useConfig } from '../context/ConfigProvider';
import { UserProvider, useCurrentUser } from '../context/UserProvider';
import { EventProvider, useEvent } from '../context/EventProvider';
import "./Main.css";
import MainButton from './MainButton.jsx';
import AccIcon from '../AccountIcon.png';
import ConIcon from '../ContactIcon.png';
import SetIcon from '../SettingsIcon.png';

const UserData = () => {
  const { currentUser, location, locationDetails, debug } = useCurrentUser();
  const { familyList } = useEvent();
  return (<div>
    {[currentUser, familyList, location, locationDetails, debug].map((detail, idx) => <p key={idx}>{JSON.stringify(detail, null, 2)}</p>)}
    </div>)
}

const Main = ({ user, providerId }) => {
  const { config: { firebaseClient } } = useConfig();
  return (
    <div className="container"> 
      <div className="navheaderMain">
        <h1>Currently Home:</h1>
      </div>
      <MainButton icon={AccIcon}>
        Manage Addresses
      </MainButton>
      <MainButton icon={ConIcon}>
        Manage Contacts
      </MainButton>
      <MainButton icon={SetIcon}>
        Privacy &amp; Settings
      </MainButton>
      <button onClick={async () => { await firebaseClient.auth().signOut(); }} className="logout">Sign out</button>
    </div>
  )
};

export default Main;