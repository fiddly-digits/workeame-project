import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const { VITE_CRYPTOJS } = process.env;

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = Cookies.get('userData');
    if (storedUserData) {
      const decryptedUserData = CryptoJS.AES.decrypt(
        storedUserData,
        VITE_CRYPTOJS
      ).toString(CryptoJS.enc.Utf8);
      setUserData(JSON.parse(decryptedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const encryptedUserData = CryptoJS.AES.encrypt(
        JSON.stringify(userData),
        VITE_CRYPTOJS
      ).toString();
      Cookies.set('userData', encryptedUserData, { expires: 1 / 12 });
    } else {
      Cookies.remove('userData');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
