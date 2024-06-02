import React, {useState} from 'react';
import GradientWrapper from "../../GradientWrapper";
import Button from "../Button";

const Contact = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = () => {
        window.location.href = `mailto:contact@jacob-j.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`\n${message}`)}`;
    };

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
                        Email ➣ <a href="mailto:contact@jacob-j.com"
                                   className="text-blue-500 underline">contact@jacob-j.com</a> <br/>
                        GitHub ➣ <a href="https://github.com/Zelvios" target="_blank" rel="noopener noreferrer"
                                    className="text-blue-500 underline">github.com/zelvios</a> <br/>
                        LinkedIn ➣
                    </p>
                </div>
                <div
                    className="mt-12 w-full md:w-3/4 lg:w-2/4 bg-white dark:bg-gray-900/50 rounded-xl shadow-lg md:mt-0">
                    <div className="h-full p-6 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-2xl text-gray-800 dark:text-gray-50 font-semibold">
                                Get In Touch
                            </span>
                        </div>
                        <p className="max-w-sm text-gray-600 dark:text-gray-300">
                            I'd love to hear from you
                        </p>
                        <input
                            placeholder="Your topic"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="block w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="block w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                        <Button
                            onClick={handleSendEmail}
                            className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow p-2 rounded"
                        >
                            Send a Mail
                        </Button>
                    </div>
                </div>
            </div>
        </GradientWrapper>
    );
};

export default Contact;
