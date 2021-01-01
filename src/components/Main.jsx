import { useConfig } from '../context/ConfigProvider';

const Main = ({ user, providerId }) => {
  const { config: { firebaseClient } } = useConfig();
  return (
    <div>
      <button onClick={async () => { await firebaseClient.auth().signOut(); }}>Sign out</button>
      <pre style={{ overflow: "auto" }}>{JSON.stringify({ user, providerId }, null, 2)}</pre>
    </div>
  )
};

export default Main;