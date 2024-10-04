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
    title: "TECHCOLLEGE H3",
    position: "Datatekniker Med Speciale I Programmering",
    time: "07/10/2024 - 13/12/2024",
    location: "Aalborg - Denmark",
    description:
        "Continuing education.",
    tech: [
      "C#",
      "Vue",
      "Git",
      "GitHub",
      "Godot",
    ],
  },
  {
    title: "TECHCOLLEGE H2",
    position: "Datatekniker Med Speciale I Programmering",
    time: "31/07/2023 - 06/10/2023",
    location: "Aalborg - Denmark",
    description:
      "Completed H2",
    tech: [
      "C#",
      "Vue",
      "Git",
      "GitHub",
      "Docker",
      "MS SQL",
    ],
  },
  {
    title: "TECHCOLLEGE H1",
    position: "Datatekniker Med Speciale I Programmering H1",
    time: "27/02/2023 - 11/05/2023",
    location: "Aalborg - Denmark",
    description:
        "Completed H1",
    tech: [
      "C#",
      "Git",
      "GitHub",
      "Network",
      "MS SQL",
      "SQLite",
    ],
  },
];
