import { Inter } from "next/font/google";
import "./globals.css";
import SelectStateProvider from "./selectState-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NextAuthProvider } from "@/session-provider";
import SelectBurgerProvider from "./openBurger-Provider";

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
          <SelectBurgerProvider>
            <SelectStateProvider>
              <NextAuthProvider session={session}>{children}</NextAuthProvider>
            </SelectStateProvider>
          </SelectBurgerProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
