import Link from "next/link";
import { Auth } from "@aws-amplify/auth";

export default async function Page() {
  const apiUrl = new URL(
    "/api/oauth-1",
    process.env.VERCEL_URL ?? "http://localhost:3000"
  );

  // const SSR = withSSRContext();

  console.log("URL", apiUrl.toString());

  const response = await fetch(apiUrl);
  const { url } = await response.json();

  console.log(await Auth.currentAuthenticatedUser());

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <div className="w-full">
        <Link href={url}>Auth with Twitter</Link>
        <div className="container mx-auto"></div>
      </div>
    </div>
  );
}
