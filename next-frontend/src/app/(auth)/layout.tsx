import DarkModeLoader from "@/components/layouts/loader/DarkModeLoader";
import Logo from "@/components/layouts/Logo";
import { Suspense } from "react";

export const metadata = {
  title: "Account",
  description: "User Authentication",
  icons: {
    icon: "/account.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/account.ico" />
      </head>
      <body>
        <Suspense fallback={<DarkModeLoader />}>
          <Logo />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}
