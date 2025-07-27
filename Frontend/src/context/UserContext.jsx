import { useContext } from "react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    const setUserData = (data) => {
        setUser(data);
        console.log("User data set:", data);
    }

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UseAuth = () => useContext(UserContext);
 export default UseAuth;
