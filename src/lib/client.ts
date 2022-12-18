import { auth, Client } from "twitter-api-sdk";

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
  // client_secret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET,
  callback: "http://127.0.0.1:3000/callback",
  scopes: ["tweet.write", "users.read", "offline.access"],
});
const client = new Client(authClient);

export { authClient, client };
