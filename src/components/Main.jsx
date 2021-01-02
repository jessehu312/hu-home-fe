import { useConfig } from '../context/ConfigProvider';
import { UserProvider, useCurrentUser } from '../context/UserProvider';

const UserData = () => {
  const { currentUser, location, locationDetails, debug } = useCurrentUser();
  return (<div>
    {[currentUser, location, locationDetails, debug].map((detail, idx) => <p key={idx}>{JSON.stringify(detail, null, 2)}</p>)}
    </div>)
}

const Main = ({ user, providerId }) => {
  const { config: { firebaseClient } } = useConfig();
  return (
    <div>
      <button onClick={async () => { await firebaseClient.auth().signOut(); }}>Sign out</button>
      <pre style={{ overflow: "auto" }}>{JSON.stringify({ user, providerId }, null, 2)}</pre>
      <UserProvider>
        <UserData/>
      </UserProvider>
    </div>
  )
};

export default Main;