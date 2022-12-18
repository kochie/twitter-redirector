export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.code) return <div>Sad! No Code!</div>;
  if (Array.isArray(searchParams.code))
    return <div>Mah Goodness, too much Code!</div>;

  console.log(`${process.env.VERCEL_URL}/api/oauth-3`);
  const token = await fetch(`${process.env.VERCEL_URL}/api/oauth-3`, {
    method: "POST",
    body: JSON.stringify({ code: searchParams.code }),
  });

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
