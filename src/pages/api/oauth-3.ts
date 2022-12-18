import { authClient } from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

// export const config = {
//   runtime: "experimental-edge", // this is a pre-requisite
// };

export default (request: NextApiRequest, response: NextApiResponse) => {
  const { code } = JSON.parse(request.body);
  const token = authClient.requestAccessToken(code);

  return response.json({
    name: `Hello, from ${request.url} I'm now an Edge Function!`,
    token,
  });
};
