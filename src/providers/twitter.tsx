"use client";

import { createContext, useContext } from "react";
import { auth, Client } from "twitter-api-sdk";
import { authClient, client } from "@/lib/client";

const TwitterClientContext = createContext({
  client: new Client(""),
});
const TwitterAuthContext = createContext<{
  authClient: auth.OAuth2Bearer | auth.OAuth2User;
}>({
  authClient: new auth.OAuth2Bearer(""),
});

const TwitterProvider = ({ children }) => {
  return (
    <TwitterAuthContext.Provider value={{ authClient }}>
      <TwitterClientContext.Provider value={{ client }}>
        {children}
      </TwitterClientContext.Provider>
    </TwitterAuthContext.Provider>
  );
};

const useTwitterClient = () => {
  const { client } = useContext(TwitterClientContext);

  return client;
};

const useTwitterAuth = () => {
  const { authClient } = useContext(TwitterAuthContext);

  return authClient;
};

export { TwitterProvider, useTwitterClient, useTwitterAuth };
