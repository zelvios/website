import React, { useState, useEffect } from "react";
import { SideBar } from "./nav/SideBar";
import { Header } from "./nav/Header";
import Hero from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Experience } from "./experience/Experience";
import { Contact } from "./contact/Contact";

export const HomPage = () => {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="grid grid-cols-[54px_1fr]">
            <SideBar />
            <main>
                <Header />
                <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-32 pb-24">
                    <Hero />
                    <About />
                    <Projects />
                    <Experience />
                    <Contact />
                </div>
            </main>
            {showScrollTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 p-3 bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-700"
                >
                    ↑
                </button>
            )}
        </div>
    );
};
