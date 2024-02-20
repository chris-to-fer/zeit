import { Inter } from "next/font/google";
import "./globals.css";
import SelectStateProvider from "./selectState-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <SelectStateProvider>{children}</SelectStateProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
