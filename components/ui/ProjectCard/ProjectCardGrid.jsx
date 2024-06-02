import Link from "next/link";
import Image from "next/image";
import { Date, Title, SubTitle } from "./";

export const ProjectCardGrid = ({ idx, item: { thumbnail, title, description, date, slug } }) => {
    return (
        <div className="space-y-2 sm:max-w-sm">
            <Link href={`https://github.com/Zelvios/${slug}`}>
                <div className="rounded-lg cursor-pointer">
                    <Image
                        src={thumbnail}
                        alt={title}
                        width={400} // Adjust the width and height as needed
                        height={300}
                        className="rounded-lg w-full"
                    />
                </div>
            </Link>
            <div className="pt-2 text-sm flex items-center justify-between">
                <SubTitle>Project {idx + 1}</SubTitle>
                <Date>{date}</Date>
            </div>
            <Title>
                <Link href={`https://github.com/Zelvios/${slug}`}>
                    {title}
                </Link>
            </Title>
            <p>
                {description}
            </p>
        </div>
    );
};
