import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from '@react-firebase/auth';
import Loading from '../components/Loading';
import Radar from 'radar-sdk-js';

const ConfigContext = createContext({
  config: null,
});

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    return fetch('/api/client-config')
    .then(resp => resp.json())
    .then(({firebase, radar}) => {
      const radarClient = Radar;
      radarClient.initialize(radar);
      setConfig({firebaseConfig: firebase, firebaseClient, radarClient});
    })
  }, []);

  return config ? (
    <ConfigContext.Provider value={{ config }}>
      <FirebaseAuthProvider firebase={firebaseClient} {...config.firebaseConfig}>{children}</FirebaseAuthProvider>
    </ConfigContext.Provider>
  ) : <Loading/>;
}

export const useConfig = () => {
  return useContext(ConfigContext);
};