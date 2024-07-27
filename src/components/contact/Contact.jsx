import React from "react";
import { AiFillMail, AiFillLinkedin  } from "react-icons/ai";
import {SectionHeader} from "@/components/util/SectionHeader"; // Import AiFillMail icon

export const Contact = () => {
  return (
      <section className="section-wrapper" id="contact">
        <div className="p-4">
          <SectionHeader title="Contact" dir="r" />
          <div className="flex flex-wrap gap-4">
            <EmailCard />
            <Card
                title="LinkedIn"
                subtitle="sssssssssssss"
                href="https://www.linkedin.com/in/jacob-j%C3%B8rgensen-851430261/"
                Icon={AiFillLinkedin }
            />
          </div>
        </div>
      </section>
  );
};

// Update Card Component
const Card = ({ title, subtitle, Icon, href, children }) => {
  return (
      <a
          href={href}
          className="flex-1 min-w-[250px] p-4 rounded border-[1px] border-slate-600 relative overflow-hidden group bg-slate-800"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-200 group-hover:text-blue-300 group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-blue-500 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-medium text-lg text-slate-200 group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
        <p className="text-slate-400 group-hover:text-blue-300 relative z-10 duration-300">
          {subtitle}
        </p>
        {children}
      </a>
  );
};

// Email Card Component
const EmailCard = () => {
  return (
      <Card
          href="mailto:contact@jacob-j.com"
          Icon={AiFillMail}
          title="Email"
          subtitle="contact@jacob-j.com">
      </Card>
  );
};
