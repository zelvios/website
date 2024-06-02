import Image from "next/image"
import NavLink from "../NavLink"
import heroThumbnail from "../../../public/hero-thumbnail.png"
import GradientWrapper from "../../GradientWrapper"

const Hero = () => {
    return (
        <GradientWrapper>
            <section>
                <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
                    <div className='flex-none space-y-5 max-w-4xl xl:max-w-2xl'>
                        <h1 className="text-4xl text-white font-extrabold sm:text-6xl">
                            Jacob-J Portfolio
                        </h1>
                        <p className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0">
                            Passionate creator driven by curiosity and fueled by innovation. Bringing ideas to life through a blend of creativity and technology's.
                        </p>
                        <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
                            <NavLink
                                href="/#projects"
                                className="block text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
                                scroll={false}
                            >
                                Projects
                            </NavLink>
                            <NavLink
                                href="/#contact"
                                className="block text-gray-100 bg-gray-700 hover:bg-gray-800 mt-3 sm:mt-0"
                                scroll={false}
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>
                    <div className="relative">
                        <Image src={heroThumbnail} className="rounded-lg w-full" alt="Jacob-J" priority={true}/>
                    </div>
                </div>
            </section>
        </GradientWrapper>
    )
}

export default Hero