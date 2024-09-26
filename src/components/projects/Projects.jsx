import React from "react";
import { SectionHeader } from "../util/SectionHeader";
import { Project } from "./Project";

export const Projects = () => {
    return (
        <section className="section-wrapper" id="projects">
            <SectionHeader title="Projects" dir="r" />

            <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
                {projects.map((project) => {
                    return <Project key={project.title} {...project} />;
                })}
            </div>
        </section>
    );
};

const projects = [
    {
        title: "Todo-TUI",
        imgSrc: "project-imgs/todo-tui.png",
        code: "https://github.com/Zelvios/website",
        projectLink: "",
        tech: ["Rust"],
        description: "A simple Todo app designed with ratatui.rs",
        modalContent: (
            <>
                <p>A simple todo app made in rust.</p>
                <p>You are able to create, edit and delete todos.</p>
                <p>The app also adds a progress system to your todos: "Waiting", "In Progress" and "Done".</p>
                <p>There is also support for color change that changes the color throughout app.</p>
            </>
        ),
    },
];
