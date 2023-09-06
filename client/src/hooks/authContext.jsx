import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then((response) => {
        setUser(response.data); // Update the user state with the fetched data
        //ready user to fetch
        setReady(true)
        console.log(response.data)
      });
    }
  }, []);

  const [user, setUser] = useState(null);
  const [ready , setReady] = useState(false)
  return (
    <UserContext.Provider value={{ user, setUser , ready }}>
      {children}
    </UserContext.Provider>
  );
};