import { Inter } from "next/font/google";
import "../../globals.css";

import Header from "./components/Header";
import styles from "./page.module.css";
import Footer from "./components/Footer";
import { SWRProvider } from "@/app/swr-provider";
import ServerComponent from "@/app/session-action";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default async function RootLayout({ params, children }) {
  const session = await ServerComponent();
  return (
    <>
      <SWRProvider>
        <Header params={params} session={session} />

        <main className={styles.main}>{children}</main>

        <Footer params={params} />
      </SWRProvider>
    </>
  );
}
