import { createContext, useContext, useEffect, useState } from "react";

const authContextState = createContext();
const authContextSetState = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <authContextState.Provider value={user}>
      <authContextSetState.Provider value={setUser}>
        {children}
      </authContextSetState.Provider>
    </authContextState.Provider>
  );
}

export const useAuthContextState = () => {
  const context = useContext(authContextState);
  if (!context) {
    throw new Error("useAuthContextState must be called within authContext");
  }
  return context;
};

export const useAuthContextSetState = () => {
  const context = useContext(authContextSetState);
  if (!context) {
    throw new Error("useAuthContextState must be called within authContext");
  }
  return context;
};
