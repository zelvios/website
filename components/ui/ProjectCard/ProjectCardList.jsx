import Link from "next/link"
import { Date, Title, SubTitle } from "./"

export const ProjectCardList = ({ idx, item: { thumbnail, title, description, date, slug } }) => {

    return (
        <div className="gap-x-6 sm:flex">
            <Link
                href={`/projects/cs50/${slug}`}
                className="sm:max-w-[17rem]"
            >
                <img
                    src={thumbnail}
                    className="rounded-lg w-full"
                    alt={title}
                    loading="lazy"
                />
            </Link>
            <div className="space-y-2 pt-4 sm:pt-0">
                <div className="text-sm flex items-center justify-between">
                    <SubTitle>Project {idx + 1}</SubTitle>
                    <Date className="sm:hidden">
                        {date}
                    </Date>
                </div>
                <Title>
                    <Link
                        href={`/projects/cs50/${slug}`}
                    >
                        {title}
                    </Link>
                </Title>
                <p className="max-w-xl text-gray-600 dark:text-gray-300 sm:line-clamp-2">
                    {description}
                </p>
                <Date className="hidden sm:block">
                    {date}
                </Date>
            </div>
        </div>
    )
}