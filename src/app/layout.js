import { Inter } from "next/font/google";
import "./globals.css";
import SelectStateProvider from "./selectState-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
// import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "@/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default function RootLayout({ children: { session, ...children } }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <SelectStateProvider>
            <NextAuthProvider session={session}>{children}</NextAuthProvider>
          </SelectStateProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
