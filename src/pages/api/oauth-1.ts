import { NextRequest, NextResponse } from "next/server";
import { auth } from "twitter-api-sdk";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export default (req: NextRequest) => {
  const authClient = new auth.OAuth2User({
    callback: "localhost:3000/callback",
    scopes: ["tweet.write", "users.read", "offline.access"],
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
  });

  const url = authClient.generateAuthURL({
    code_challenge_method: "s256",
    state: "my-state",
  });

  return NextResponse.json({
    name: `Hello, from ${req.url} I'm now an Edge Function!`,
    url,
  });
};
