import { Inter } from "next/font/google";
import "../../globals.css";

import Header from "./components/Header";
import styles from "./page.module.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default function RootLayout({ params, children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
