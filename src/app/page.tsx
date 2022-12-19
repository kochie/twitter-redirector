import Link from "next/link";

export default async function Page() {
  const apiUrl = new URL(
    "/api/oauth-1",
    process.env.VERCEL_URL ?? "http://localhost:3000"
  );

  console.log("URL", apiUrl.toString());

  const response = await fetch(apiUrl);
  const { url } = await response.json();

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <div>
        <Link href={url}>Auth with Twitter</Link>
      </div>
    </div>
  );
}
