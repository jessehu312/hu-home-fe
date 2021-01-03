import { useConfig } from '../context/ConfigProvider';
import { useCurrentUser } from '../context/UserProvider';
import { EventProvider, useEvent } from '../context/EventProvider';
import "./Main.css";
import MainButton from './MainButton';
import Roster from './Roster';
import AccIcon from '../AccountIcon.png';
import ConIcon from '../ContactIcon.png';
import SetIcon from '../SettingsIcon.png';

const Main = ({ user, providerId }) => {
  const { config: { firebaseClient } } = useConfig();
  const { currentUser } = useCurrentUser();
  return (
    <div className="container"> 
      <div className="navheaderMain">
        <h1>Currently Home:</h1>
        <EventProvider>
          <Roster {...currentUser}/>
        </EventProvider>
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