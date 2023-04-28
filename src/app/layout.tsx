import Authentication from "@/components/Auth";
import "@/styles/globals.css";
import { Auth } from "@aws-amplify/auth";

// Auth.configure({
//   userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
//   userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   ssr: true,
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Authentication />
        {children}
      </body>
    </html>
  );
}
