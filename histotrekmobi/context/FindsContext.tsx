import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindsContext = createContext(null);

export function FindsProvider({ children }) {
  const [finds, setFinds] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('finds').then((stored) => {
      if (stored) setFinds(JSON.parse(stored));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('finds', JSON.stringify(finds));
  }, [finds]);

  const addFinds = (find) => {
    setFinds((prev) => [...prev, find]);
  };

  return (
    <FindsContext.Provider value={{ finds, addFinds, setFinds }}>
      {children}
    </FindsContext.Provider>
  );
}

export const useFinds = () => useContext(FindsContext);
