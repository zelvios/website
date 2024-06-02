import { useState, useEffect } from "react";
import Project from "../components/ui/Project";
import CTA from "../components/ui/CTA";
import Skills from "../components/ui/Skills";
import Hero from "../components/ui/Hero";
import Contact from "../components/ui/Contact";

const FadeInSection = ({ children, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        // Cleanup
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div style={{ transition: "opacity 0.5s", opacity: isVisible ? 1 : 0 }}>
            {children}
        </div>
    );
};

export default function Home() {
    const delay = 500;
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled below a specific threshold
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);

        // Scroll to the top when component mounts
        window.scrollTo(0, 0);

        // Cleanup
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
        <>
            <FadeInSection delay={0}>
                <Hero />
            </FadeInSection>
            <FadeInSection delay={delay}>
                <CTA />
            </FadeInSection>
            <FadeInSection delay={delay}>
                <Skills />
            </FadeInSection>
            <FadeInSection delay={delay * 2}>
                <Project />
            </FadeInSection>
            <FadeInSection delay={delay * 2}>
                <Contact />
            </FadeInSection>
            {showScrollButton && (
                <button
                    className="scroll-to-top-button"
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    ^
                </button>
            )}
        </>
    );
}
