import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';

const UserContext = createContext({
  currentUser: null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const { config: {firebaseClient} } = useConfig();

  useEffect(() => {
    return firebaseClient.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      return fetch(
        '/api/get-user', 
        {
          method: 'post', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({token: idToken})})
    })
    .then(resp => resp.json())
    .then(currentUser => {
      setCurrentUser(currentUser);
    })
    .catch(function(error) {
      console.error(error)
    });
  }, []);

  return currentUser ? (
    <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
  ) : <div>Loading...</div>;
}

export const useCurrentUser = () => {
  return useContext(UserContext);
};