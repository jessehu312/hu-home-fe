import React, { useState, useEffect, useContext, createContext } from "react";
import { useConfig } from '../context/ConfigProvider';

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
      setLocation({"location":{"type":"Point","coordinates":[-123.08638949999998,49.146664099999995]},"live":false,"geofences":[],"_id":"5ff0c6c837d32500302febc7","createdAt":"2021-01-02T19:17:28.697Z","updatedAt":"2021-01-03T06:53:24.123Z","actualUpdatedAt":"2021-01-03T06:53:24.123Z","userId":"1KDPQKtPDeSeHyyqXqnGY4hi1Lj2","deviceId":"2ea2ca75-1d08-41c4-90b9-6ddc8ec82dfe","installId":"2ea2ca75-1d08-41c4-90b9-6ddc8ec82dfe","foreground":true,"stopped":true,"description":"jessehu312@gmail.com","metadata":{"email":"jessehu312@gmail.com","family_id":"79d4ff9a-41a6-4d40-8caa-1513061ffc31","id":"1KDPQKtPDeSeHyyqXqnGY4hi1Lj2"},"deviceType":"Web","locationAccuracy":4495,"ip":"104.243.105.189"})
      setLocationDetails({"meta":{"code":200},"addresses":[{"latitude":49.146935,"longitude":-123.080908,"geometry":{"type":"Point","coordinates":[-123.080908,49.146935]},"country":"Canada","countryCode":"CA","countryFlag":"🇨🇦","distance":400,"city":"Richmond","number":"9331","neighborhood":"East Richmond","postalCode":"V6W 1C1","stateCode":"BC","state":"British Columbia","street":"Sidaway Rd","layer":"address","formattedAddress":"9331 Sidaway Rd, Richmond, BC V6W 1C1 CAN","addressLabel":"9331 Sidaway Rd"}]})
      /*const { id, email } = profile.me
      radarClient.setUserId(id);
      radarClient.setMetadata(profile.me);
      radarClient.setDescription(email);
      return new Promise((resolve, reject)=> {
        radarClient.trackOnce((err, result) => err ? reject(err) : resolve(result));
      })*/
    })
    /*.then(radar => {
      setLocation(radar);
      const { location: { latitude, longitude }} = radar;
      return new Promise((resolve, reject)=>{
        radarClient.reverseGeocode({latitude, longitude}, (err, result) => err ? reject(err) : resolve(result));
      })
    })
    .then(reverseGeocode => {
      setLocationDetails(reverseGeocode);
    })*/
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
  ) : <div>Loading...</div>;
}

export const useCurrentUser = () => {
  return useContext(UserContext);
};