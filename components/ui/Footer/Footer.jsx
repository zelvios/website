import Newsletter from '../Information'

const navigation = [
    { name: "Skills", href: "/#skills" }
]

const Footer = () => {

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="pt-32 sm:pt-44">
            <div className="custom-screen text-gray-600 dark:text-gray-300">
                <Newsletter />
                <div className="mt-10 py-10 border-t dark:border-gray-800 flex-row-reverse items-center justify-between sm:flex">
                    <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
                        {
                            navigation.map((item, idx) => (
                                <li key={idx} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-500 duration-150 md:font-medium">
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href.substring(2));
                                        }}
                                        className="block"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                    <p className="mt-6 sm:mt-0 unselectable" style={{userSelect: 'none'}}>© 2024 Jacob-J Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
