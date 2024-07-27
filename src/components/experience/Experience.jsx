import { SectionHeader } from "../util/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = () => {
  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />
      {experience.map((item) => (
        <ExperienceItem key={item.title} {...item} />
      ))}
    </section>
  );
};

const experience = [
  {
    title: "Techcollege",
    position: "Datatekniker Med Speciale I Programmering",
    time: "2022 - 2026",
    location: "Aalborg - Denmark",
    description:
      "Continuing education: Completed H2 and will begin H3 from July 10, 2024, to December 13, 2024.",
    tech: [
      "C#",
      "Rust",
      "Git",
      "GitHub",
      "Docker",
    ],
  },
];
