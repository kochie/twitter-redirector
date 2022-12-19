import { authClient } from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

// export const config = {
//   runtime: "experimental-edge", // this is a pre-requisite
// };

export default (request: NextApiRequest, response: NextApiResponse) => {
  const url = authClient.generateAuthURL({
    code_challenge_method: "plain",
    code_challenge: "my-code-challenge",
    state: "my-state",
  });

  return response.json({
    name: `Hello, from ${request.url} I'm now an Edge Function!`,
    url,
  });
};
