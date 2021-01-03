import { ConfigProvider } from './context/ConfigProvider';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConfigProvider>
          <Routes />
      </ConfigProvider>
    </div>
  );
}

export default App;
