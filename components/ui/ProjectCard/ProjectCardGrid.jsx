import Link from "next/link"
import { Date, Title, SubTitle } from "./"

export const ProjectCardGrid = ({ idx, item: { thumbnail, title, description, date, slug } }) => {

    return (
        <div className="space-y-2 sm:max-w-sm">
            <Link href={`https://github.com/Zelvios/${slug}`}>
                <img src={thumbnail} className="rounded-lg w-full" alt={title} />
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
    )
}