// UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with user data
  const loginUser = (userData) => {
    setUser(userData);
  };
  return (
    <UserContext.Provider value={{ user, setUser,loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);