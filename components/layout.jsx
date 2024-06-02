import Head from "next/head";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Jacob-J</title>
                <meta name='description' content="Passionate creator driven by curiosity and fueled by innovation. Bringing ideas to life through a blend of creativity and technology's" />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <footer>
                <p>© 2024 Jacob-J Portfolio. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
