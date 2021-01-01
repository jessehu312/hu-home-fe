import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';

const UserContext = createContext({
  currentUser: null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const { config: {firebaseClient, radarClient} } = useConfig();

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
      setCurrentUser({ firebase: currentUser});
      const { uid, email } = currentUser
      radarClient.setUserId(uid);
      radarClient.setMetadata({email, uid});
      radarClient.setDescription('this is a user');
      return new Promise((resolve, reject)=> {
        radarClient.trackOnce((err, result) => err ? reject(err) : resolve(result));
      })
    })
    .then(radar => {
      setCurrentUser({...currentUser, radar});
      const { location: { latitude, longitude }} = radar;
      return new Promise((resolve, reject)=>{
        radarClient.reverseGeocode((err, result) => err ? reject(err) : resolve(result));
      })
    })
    .then(reverseGeocode => {
      setCurrentUser({...currentUser, reverseGeocode});
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