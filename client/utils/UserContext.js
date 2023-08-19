import React, { useState, useContext, createContext, useEffect } from "react";
import UsersApi from "./apis/UsersApi";
import { useSession } from "next-auth/react";

// create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loadingAccountData, setLoadingAccountData] = useState(true);
  const { data } = useSession();

  async function getCurrentUserInfo() {
      try {
          if (data) {
              const userDataResponse = await UsersApi.getUserAccountInfo(data.user.id, data.user.token);
              setUserData(userDataResponse);
          }
      } catch (error) {
          console.error(error);
      } finally {
          setLoadingAccountData(false);
      }
  }

  useEffect(() => {
      getCurrentUserInfo();
  }, [data]);

  const value = { userData, setUserData, loadingAccountData };  // <--- Add loadingAccountData to the value

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// create hook for using context
export const useUserContext = () => {
    return useContext(UserContext);
};
