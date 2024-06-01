import Link from "next/link"
import SectionWrapper from "../../SectionWrapper"
import { ProjectCardGrid } from "../ProjectCard"
import lessonsExamples from "../../../projects/projectList.json";

const Project = () => {
    return (
        <SectionWrapper id="projects">
            <div className="custom-screen text-gray-600 dark:text-gray-300">
                <div className="max-w-xl space-y-3">
                    <h2 className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Selected Projects from My Professional Journey
                    </h2>
                    <p>
                        The majority of my projects are meticulously cataloged on GitHub should you wish to delve
                        further into my work.{" "}
                        <Link href="https://github.com/Zelvios" target="_blank" rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-600 inline-flex items-center gap-x-1 duration-150">
                            Browse projects
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="w-5 h-5">
                                <path fillRule="evenodd"
                                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                      clipRule="evenodd"/>
                            </svg>
                        </Link>
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {lessonsExamples.map((item, idx) => (
                            <li key={idx}>
                                <ProjectCardGrid idx={idx} item={item}/>
                                <a href={`https://github.com/Zelvios/${encodeURIComponent(item.title)}`} target="_blank"
                                   rel="noopener noreferrer">
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </SectionWrapper>
    )
}

export default Project