import Link from "next/link"
import SectionWrapper from "../../SectionWrapper"

const CTA = () => {

    const topicsList = [
        "Rust, C#, TypeScript, JavaScript, Kotlin ",
        ".NET, Vue, HTML, CSS",
        "PostgreSQL, MySQL,",
        "Docker, Linux, GIT, Node.js"
    ]
    return (
        <SectionWrapper id="cta">
            <div className="custom-screen">
                <div className="max-w-3xl space-y-6 text-gray-600 dark:text-gray-300">
                    <h2 className="text-gray-800 dark:text-gray-50 text-2xl font-semibold sm:text-3xl">
                        About Me
                    </h2>
                    <p>
                        A 22-year-old individual with a solid foundation in programming attained through a focused education at Tech-college Aalborg. Throughout my programming journey, I have acquired a diverse array of skills and knowledge, including but not limited to:

                    </p>
                    <div>
                        <ul className="space-y-4">
                            {
                                topicsList.map((item, idx) => (
                                    <li key={idx} className="flex gap-x-5">
                                        <div className="flex-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-sky-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>

                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <p>
                        Intrigued? {""}
                        <Link href="#projects" className="text-blue-600 hover:text-blue-400 dark:text-sky-500 dark:hover:text-sky-600 inline-flex items-center gap-x-1 duration-150" scroll={false}>
                            Explore my projects
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </p>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default CTA