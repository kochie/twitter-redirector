import { TwitterProvider } from "@/providers/twitter";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TwitterProvider>{children}</TwitterProvider>
      </body>
    </html>
  );
}
