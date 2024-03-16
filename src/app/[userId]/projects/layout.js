import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "./components/Header";
import styles from "./page.module.css";
import Footer from "./components/Footer";
import { SWRProvider } from "@/app/swr-provider";
import ServerComponent from "@/app/session-action";
import { redirect } from "next/navigation";
import DisplayNumberProvider from "@/app/displayNumber-Provider";
import LocProvider from "@/app/localization-Provider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zeit",
  description: "online Stundenzettel Cloud App",
};

export default async function RootLayout({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;

  const session = await ServerComponent();

  if (session.user.userId !== params.userId) {
    // return <h2 className={styles.main}>no permission</h2>;
    redirect(`${HOSTNAME}`);
  }

  return (
    <>
      <SWRProvider>
        <LocProvider>
          <DisplayNumberProvider>
            <Header params={params} session={session} />

            <Suspense fallback={<Loading />}>
              <main className={styles.main}>{children}</main>
            </Suspense>
            <Footer params={params} />
          </DisplayNumberProvider>
        </LocProvider>
      </SWRProvider>
    </>
  );
}
