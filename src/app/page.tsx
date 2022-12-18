import Link from "next/link";

export default async function Page() {
  const response = await fetch(`${process.env.VERCEL_URL}/api/oauth-1`);
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
