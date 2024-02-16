import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      {/* <SWRConfig value={{ fetcher }}> */}
      <body className={inter.className}>{children}</body>
      {/* </SWRConfig> */}
    </html>
  );
}
