import {Chip} from "../util/Chip";
import Reveal from "../util/Reveal";
import {AiFillCode, AiFillDatabase, AiOutlineLinux} from "react-icons/ai";
import {IoLibrary} from "react-icons/io5";

export const Stats = () => {
    return (<div className="relative">
            <Reveal>
                <div>
                    <h4 className="flex items-center mb-6">
                        <AiFillCode className="text-indigo-500 text-2xl"/>
                        <span className="font-bold ml-2">Languages</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-12">
                        <Chip>Rust</Chip>
                        <Chip>C#</Chip>
                        <Chip>JavaScript</Chip>
                    </div>
                </div>
            </Reveal>
            <Reveal>
                <div>
                    <h4 className="flex items-center mb-6">
                        <IoLibrary className="text-indigo-500 text-2xl"/>
                        <span className="font-bold ml-2">Libraries and Frameworks</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-12">
                        <Chip>Vue</Chip>
                        <Chip>DotNet</Chip>
                        <Chip>HTML</Chip>
                        <Chip>CSS</Chip>
                        <Chip>Bootstrap</Chip>
                        <Chip>React</Chip>
                        <Chip>NodeJS</Chip>
                    </div>
                </div>
            </Reveal>
            <Reveal>
                <div>
                    <h4 className="flex items-center mb-6">
                        <AiFillDatabase className="text-indigo-500 text-2xl"/>
                        <span className="font-bold ml-2">Databases</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-12">
                        <Chip>PostgresSQL</Chip>
                        <Chip>MySQL</Chip>
                        <Chip>SQLite</Chip>
                    </div>
                </div>
            </Reveal>
            <Reveal>
                <div>
                    <h4 className="flex items-center mb-6">
                        <AiOutlineLinux className="text-indigo-500 text-2xl"/>
                        <span className="font-bold ml-2">Software and Tools</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-12">
                        <Chip>Linux</Chip>
                        <Chip>Windows</Chip>
                        <Chip>Docker</Chip>
                        <Chip>Android Studio</Chip>
                        <Chip>cloudflare</Chip>
                    </div>
                </div>
            </Reveal>
        </div>);
};
