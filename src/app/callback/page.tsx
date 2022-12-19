export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.code) return <div>Sad! No Code!</div>;
  if (Array.isArray(searchParams.code))
    return <div>Mah Goodness, too much Code!</div>;

  const url = new URL(
    "/api/oauth-3",
    process.env.VERCEL_URL ?? "http://localhost:3000"
  );
  // console.log(`${process.env.VERCEL_URL}/api/oauth-3`);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ code: searchParams.code }),
  });

  const { token } = await response.json();

  console.log(token);

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <div>
        <button>
          <a>Auth with Twitter</a>
        </button>
      </div>
    </div>
  );
}
