import { Inter } from "next/font/google";
import { HomPage } from "@/components";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Jacob-J</title>
                <meta name="description"  content="A portfolio created to showcase expertise in web development, design, and programming." />
            </Head>
            <main className={inter.className}>
                <HomPage />
            </main>
        </>
    );
}
