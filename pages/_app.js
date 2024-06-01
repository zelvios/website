import Layout from "../components/layout";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function App({ Component, pageProps, ...appProps }) {
    const isLayoutNeeded = true;

    const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

    return (
        <ThemeProvider defaultTheme='light' attribute='class'>
            <LayoutComponent>
                <Component {...pageProps} />
            </LayoutComponent>
        </ThemeProvider>
    );
}
