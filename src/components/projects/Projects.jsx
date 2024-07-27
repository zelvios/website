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
        title: "Rust Api",
        imgSrc: "project-imgs/example-project.jpg",
        code: "https://www.github.com",
        projectLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        tech: ["Rust", "C#", "Python", "FastAPI"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        modalContent: (
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fusce vehicula justo ut lorem fermentum, vel scelerisque mauris feugiat.</p>
                <p>Curabitur eu nisi id elit dignissim interdum.</p>
                <p>Proin ut bibendum ante. Nullam imperdiet risus nec orci ultrices, at aliquet lacus consectetur.</p>
                <p>Nam et turpis sed nisl malesuada consectetur eget at augue.</p>
            </>
        ),
    },
    {
        title: "Eat More",
        imgSrc: "project-imgs/example-project.jpg",
        code: "https://www.github.com",
        projectLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        tech: ["Node", "Express", "Postgres", "Kafka", "Redis"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        modalContent: (
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Phasellus ultricies metus id libero convallis, vel dictum dolor laoreet.</p>
                <p>Nullam auctor urna non velit condimentum, ut facilisis ante cursus.</p>
                <p>Suspendisse id velit ut justo varius consequat ac ut nisi.</p>
                <p>Aenean sed magna ut lorem posuere cursus et a erat.</p>
            </>
        ),
    },
    {
        title: "Eat Less",
        imgSrc: "project-imgs/example-project.jpg",
        code: "https://www.github.com",
        projectLink: "",
        tech: ["NextJS", "Java", "Spring", "AWS Aurora"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        modalContent: (
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Donec ut diam nec velit tincidunt cursus sit amet in lectus.</p>
                <p>Vestibulum vel dolor nec libero convallis feugiat.</p>
                <p>Nam ac nisi et arcu placerat feugiat.</p>
                <p>Integer convallis orci nec arcu condimentum, nec lacinia erat dictum.</p>
            </>
        ),
    },
];
