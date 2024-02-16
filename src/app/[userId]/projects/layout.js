import { Inter } from "next/font/google";
import "../../globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./page.module.css";
import Footer from "./components/Footer";
import Page from "./page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        {children}
      </main>
      <Footer />
    </>
  );
}
