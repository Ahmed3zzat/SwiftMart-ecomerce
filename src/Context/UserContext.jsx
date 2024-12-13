import React, { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContext({ children }) {
  let [Token, setToken] = useState(localStorage.getItem("token"));

  //   useEffect(() => {
  //     if (localStorage.key("token")) {
  //       setToken(localStorage.getItem("token"));
  //     }
  //     // Mounting
  //   }, []);

  return (
    <userContext.Provider value={{ Token, setToken }}>
      {children}
    </userContext.Provider>
  );
}

