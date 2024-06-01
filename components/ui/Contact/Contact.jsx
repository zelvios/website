import GradientWrapper from "../../GradientWrapper"
import Button from "../Button";

const Contact = () => {
    return (
        <GradientWrapper id="contact" className="overflow-hidden dark:overflow-visible dark:my-0 sm:my-16">
            <div className="custom-screen gap-12 justify-between md:flex">
                <div className='relative max-w-2xl text-gray-300'>
                    <h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
                        Contact Information
                    </h2>
                    <p className='mt-3 max-w-xl'>
                        Feel free to explore my social channels for additional insights or if you're interested in
                        potential collaborations: <br/><br/>
                        Email ➣ contact@jacob-j.com <br/>
                        GitHub ➣ <br/>
                        LinkedIn ➣
                    </p>
                </div>
                <div className="mt-12 bg-white dark:bg-gray-900/50 rounded-xl shadow-lg md:mt-0">
                    <div className="h-full p-6 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-2xl text-gray-800 dark:text-gray-50 font-semibold">
                                Contact Me
                            </span>
                            <div className="text-2xl text-gray-800 dark:text-gray-50 font-semibold">
                                !!!
                            </div>

                        </div>
                        <p className="max-w-sm text-gray-600 dark:text-gray-300">
                            You are welcome to reach out to me by email at:
                            contact@jacob-j.com
                        </p>
                        <Button className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow">
                            Coming Soon
                        </Button>
                    </div>
                </div>
            </div>
        </GradientWrapper>
    )
}

export default Contact