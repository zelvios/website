import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {SiCsharp, SiDotnet, SiGithub, SiLinkedin, SiRust,} from "react-icons/si";
import {twMerge} from "tailwind-merge";
import {AiOutlineArrowRight} from "react-icons/ai";
import {SectionHeader} from "../util/SectionHeader";
import Reveal from "../util/Reveal";
import {MyLinks} from "../nav/Header";
import {Stats} from "./Stats";

// FoldingLogos component
const FoldingLogos = () => {
    return (<section className="flex items-center justify-center px-0 py-16 md:flex-row">
            <LogoRolodex
                items={[<LogoItem key={1} className="bg-orange-300 text-neutral-900">
                    <SiLinkedin/>
                </LogoItem>, <LogoItem key={2} className="bg-white text-neutral-900">
                    <SiGithub/>
                </LogoItem>, <LogoItem key={3} className="bg-red-400 text-neutral-900">
                    <SiRust/>
                </LogoItem>, <LogoItem key={4} className="bg-blue-300 text-black">
                    <SiDotnet/>
                </LogoItem>, <LogoItem key={5} className="bg-blue-600 text-neutral-900">
                    <SiCsharp/>
                </LogoItem>,]}
            />
        </section>);
};


const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({items}) => {
    const intervalRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((pv) => pv + 1);
        }, DELAY_IN_MS);

        return () => {
            clearInterval(intervalRef.current || undefined);
        };
    }, []);

    return (<div
            style={{
                transform: "rotateY(-20deg)", transformStyle: "preserve-3d",
            }}
            className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
        >
            <AnimatePresence mode="sync">
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                        zIndex: -index,
                        backfaceVisibility: "hidden",
                    }}
                    key={index}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut",
                    }}
                    initial={{rotateX: "0deg"}}
                    animate={{rotateX: "0deg"}}
                    exit={{rotateX: "-180deg"}}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
                <motion.div
                    style={{
                        y: "-50%",
                        x: "-50%",
                        clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                        zIndex: index,
                        backfaceVisibility: "hidden",
                    }}
                    key={(index + 1) * 2}
                    initial={{rotateX: "180deg"}}
                    animate={{rotateX: "0deg"}}
                    exit={{rotateX: "0deg"}}
                    transition={{
                        duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2"
                >
                    {items[index % items.length]}
                </motion.div>
            </AnimatePresence>

            <hr
                style={{
                    transform: "translateZ(1px)",
                }}
                className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
            />
        </div>);
};

const LogoItem = ({children, className}) => {
    return (<div
            className={twMerge("grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50", className)}
        >
            {children}
        </div>);
};

// About component
export const About = () => {
    return (<section id="about" className="section-wrapper">
            <SectionHeader title="About" dir="l"/>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
                <div className="space-y-4">
                    <Reveal>
                        <p className="leading-relaxed text-zinc-300">
              <span className="bg-indigo-500 text-white py-2 px-3 rounded font-bold mr-1 float-left text-2xl">
                H
              </span>
                            ey! I&apos;m Jacob. I&apos;m a student at TECHCOLLEGE for programming where I specialize in
                            the backend, primarily Rust, but love building with whatever tools are right for the job.
                        </p>
                    </Reveal>
                    <Reveal>
                        <p className="leading-relaxed text-zinc-300">
                            I am currently a apprentice for TECHCOLLEGE where I study for computer technician studying programming.
                        </p>
                    </Reveal>
                    <Reveal>
                        <p className="leading-relaxed text-zinc-300">
                            Outside of work, I still love to program. Any given Sunday
                            you&apos;ll find me programming something.
                        </p>
                    </Reveal>
                    <Reveal>
                        <p className="leading-relaxed text-zinc-300">
                            I&apos;m passively looking for new positions where I can merge my
                            love for code. If you think
                            you&apos;ve got an opening that I might like, let&apos;s connect.
                        </p>
                    </Reveal>
                    <Reveal>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-sm text-indigo-200">
                                <span>My links</span>
                                <AiOutlineArrowRight/>
                            </div>
                            <MyLinks/>
                        </div>
                    </Reveal>
                    <FoldingLogos/>
                </div>
                <Stats/>
            </div>
        </section>);
};
