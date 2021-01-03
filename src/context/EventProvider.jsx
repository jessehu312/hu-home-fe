import io from 'socket.io-client';
import React, { useState, useEffect, useContext, createContext } from "react";
import { useCurrentUser } from '../context/UserProvider';

const EventContext = createContext({
  familyList: null
});

export function EventProvider({ children }) {
  const [familyList, setFamilyList] = useState(null);
  const { currentUser, location } = useCurrentUser();

  useEffect(() => {
    const { me, family } = currentUser;
    const socket = io('/', {
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-client-id': me.id,
            'x-family-id': family.id
          }
        }
      }
    });

    socket.on('connect', () => {
      console.log('connected');
      socket.emit('update', {
          geo: location.location
      });
    })

    socket.on('roster', (data)=>{
      setFamilyList(data);
    })
  }, []);

  return <EventContext.Provider value={{ familyList }}>{children}</EventContext.Provider>
}

export const useEvent = () => {
  return useContext(EventContext);
};