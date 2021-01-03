import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';
import Loading from '../components/Loading.jsx';

const UserContext = createContext({
  currentUser: null,
  location: null,
  locationDetails: null,
  debug: null
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [debug, setDebug] = useState(null);
  const { config: {firebaseClient, radarClient} } = useConfig();

  useEffect(() => {
    return firebaseClient.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => fetch(
      '/api/get-user', 
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      }
    ))
    .then(resp => resp.json())
    .then(({debug, profile}) => {
      setCurrentUser(profile);
      setDebug(debug);
      const { id, email } = profile.me
      radarClient.setUserId(id);
      radarClient.setMetadata(profile.me);
      radarClient.setDescription(email);
      return new Promise((resolve, reject)=> {
        radarClient.trackOnce((err, result) => err ? reject(err) : resolve(result));
      })
    })
    .then(radar => {
      setLocation(radar);
      const { location: { latitude, longitude }} = radar;
      return new Promise((resolve, reject)=>{
        radarClient.reverseGeocode({latitude, longitude}, (err, result) => err ? reject(err) : resolve(result));
      })
    })
    .then(reverseGeocode => {
      setLocationDetails(reverseGeocode);
    })
    .catch(function(error) {
      console.error(error)

      console.info('Did Radar.io ratelimit us? fallback to browser location')
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation({location: pos});
        setLocationDetails({addresses: [location]});
      });
    });
  }, []);

  return (currentUser && location && locationDetails && debug) ? (
    <UserContext.Provider value={{ currentUser, location, locationDetails, debug }}>{children}</UserContext.Provider>
  ) : <Loading />
}

export const useCurrentUser = () => {
  return useContext(UserContext);
};