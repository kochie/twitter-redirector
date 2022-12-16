"use client";

import { useRouter } from "next/navigation";
import { auth } from "twitter-api-sdk";

export const Auth = () => {
  const router = useRouter();

  async function startAuth() {
    const authClient = new auth.OAuth2User({
      client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
      callback: "http://127.0.0.1:3000/callback",
      scopes: ["tweet.write", "users.read", "offline.access"],
    });

    // const client = new Client(authClient);

    const authUrl = authClient.generateAuthURL({
      code_challenge_method: "s256",
      state: "IMA STATE",
    });

    router.push(authUrl);
  }

  return (
    <button onClick={startAuth}>
      <a>Auth with Twitter</a>
    </button>
  );
};
