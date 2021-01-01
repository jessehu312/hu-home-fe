import { ConfigProvider } from './context/ConfigProvider';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import Main from './components/Main';
import Login from './components/Login';

function App() {
  return (
    <ConfigProvider>
      <FirebaseAuthConsumer>
      {({ isSignedIn, ...values}) => 
        isSignedIn ? <Main {...values}/> : <Login/>
      }
      </FirebaseAuthConsumer>
    </ConfigProvider>
  );
}

export default App;
