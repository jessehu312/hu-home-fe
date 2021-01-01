import { useConfig } from '../context/ConfigProvider';
import { UserProvider, useCurrentUser } from '../context/UserProvider';

const UserData = () => {
  const { currentUser } = useCurrentUser();
  return (<p>{JSON.stringify(currentUser, null, 2)}</p>)
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