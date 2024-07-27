import { Chip } from "../util/Chip";
import Reveal from "../util/Reveal";
import { AiFillCode, AiFillSmile, AiFillDatabase, AiOutlineLinux   } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";

export const Stats = () => {
  return (
    <div className="relative">
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillCode className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2">Languages</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>Rust</Chip>
            <Chip>C#</Chip>
            <Chip>Vue</Chip>
            <Chip>React</Chip>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <IoLibrary className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2">Libraries and Frameworks</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>vue</Chip>
            <Chip>dotnet</Chip>
            <Chip>html</Chip>
            <Chip>css</Chip>
            <Chip>bootstrap</Chip>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiFillDatabase className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2">Databases</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>postgres</Chip>
            <Chip>mysql</Chip>
            <Chip>sqlite</Chip>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div>
          <h4 className="flex items-center mb-6">
            <AiOutlineLinux className="text-indigo-500 text-2xl" />
            <span className="font-bold ml-2">Software and Tools</span>
          </h4>
          <div className="flex flex-wrap gap-2 mb-12">
            <Chip>Linux</Chip>
            <Chip>Windows</Chip>
            <Chip>Docker</Chip>
            <Chip>androidstudio</Chip>
            <Chip>nodejs</Chip>
            <Chip>cloudflare</Chip>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
