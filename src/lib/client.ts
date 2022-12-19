import { auth, Client } from "@kochie/twitter-api-sdk";

const STATE = "my-state";

const generateUrlOptions: auth.GenerateAuthUrlOptions = {
  state: STATE,
  code_challenge_method: "plain",
  code_challenge: "my-code-challenge",
};

const authClient = new auth.OAuth2User(
  {
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: "http://127.0.0.1:3000/callback",
    scopes: ["tweet.write", "tweet.read", "users.read", "offline.access"],
  },
  generateUrlOptions
);

const client = new Client(authClient);

export { authClient, client };
