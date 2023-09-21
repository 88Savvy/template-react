import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userId, setUserId] = useState({});	

   const location = useLocation(); //url da página

   useEffect(() => {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem("userId");

      if (token) {
         setIsLoggedIn(true);
         setUserId(userId);
      } else {
         setIsLoggedIn(false);
      }
   }, [location]);

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId }}>
         {children}
      </AuthContext.Provider>
   );
}
