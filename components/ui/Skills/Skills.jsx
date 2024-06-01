import SectionWrapper from "../../SectionWrapper"

const Skills = () => {

    const skills = [
        {
            icon:
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M9.00033 22H10.0003V20H9.01133C8.70333 19.994 6.00033 19.827 6.00033 16C6.00033 14.007 5.33533 12.754 4.49833 12C5.33533 11.246 6.00033 9.993 6.00033 8C6.00033 4.173 8.70333 4.006 9.00033 4H10.0003V2H8.99833C7.26933 2.004 4.00033 3.264 4.00033 8C4.00033 10.8 2.32233 10.99 1.98633 11L2.00033 13C2.08233 13 4.00033 13.034 4.00033 16C4.00033 20.736 7.26933 21.996 9.00033 22ZM22.0003 11C21.9183 11 20.0003 10.966 20.0003 8C20.0003 3.264 16.7313 2.004 15.0003 2H14.0003V4H14.9893C15.2973 4.006 18.0003 4.173 18.0003 8C18.0003 9.993 18.6653 11.246 19.5023 12C18.6653 12.754 18.0003 14.007 18.0003 16C18.0003 19.827 15.2973 19.994 15.0003 20H14.0003V22H15.0023C16.7313 21.996 20.0003 20.736 20.0003 16C20.0003 13.2 21.6783 13.01 22.0143 13L22.0003 11Z" fill="currentColor" />
                </svg>,
            title: "Languages",
            desc: "Proficient in Rust for robust systems programming, C# for object-oriented development, TypeScript and JavaScript for scalable web applications, and Kotlin specifically for Android app development."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>,
            title: "Frameworks",
            desc: "Fluent in WPF for creating rich desktop applications with advanced user interfaces, combined with expertise in .NET for seamless integration and functionality. Accomplished in Vue.js, HTML, and CSS for comprehensive front-end development across various platforms."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>,
            title: "Databases",
            desc: "Skilled in Docker for efficient containerization and deployment strategies, adept with PostgreSQL for robust and scalable database management."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>,
            title: "Partnerships",
            desc: "I have not yet had the opportunity to collaborate professionally, but I am enthusiastic about the prospect of embarking on a meaningful partnership, with you potentially being the first."
        },
    ]

    return (
        <SectionWrapper id="skills" className="dark:my-0 bg-gray-50 dark:bg-gray-900 sm:my-16">
            <div className="custom-screen text-gray-600 dark:text-gray-300">
                <div className="max-w-xl space-y-3">
                    <h2 className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Skills
                    </h2>
                    <p>
                        Throughout my extensive coding experience, I have honed a comprehensive set of skills through collaborative endeavors and years of dedicated practice.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            skills.map((item, idx) => (
                                <li key={idx} className="flex gap-x-4">
                                    <div className="flex-none w-12 h-12 bg-white dark:bg-gray-800 border dark:border-gray-700 text-blue-600 dark:text-sky-500 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Skills