"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    org: "VoxSun Telecom",
    role: "Software Developer",
    when: "Dec 2023 – present",
    line: "Backend and telecom integrations, running in production.",
  },
  {
    org: "Speedwapp",
    role: "Software Developer",
    when: "Oct 2022 – Sep 2024",
    line: "Shipped features for a live product used by real users.",
  },
  {
    org: "Freelance",
    role: "Software Engineer",
    when: "2020 – present",
    line: "Turning ideas into working products for startups and businesses.",
  },
];

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiNodedotjs,
  SiDjango,
  SiRedis,
  SiGraphql,
  SiLaravel,
} from "@icons-pack/react-simple-icons";

const icons = [
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiGit, label: "Git" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiDjango, label: "Django" },
  { Icon: SiRedis, label: "Redis" },
  { Icon: SiGraphql, label: "GraphQL" },
  { Icon: SiLaravel, label: "Laravel" },
];

const beats = [
  {
    when: "2020",
    title: "Started building for clients",
    body: "Freelance software development — turning ideas into working products, and learning that shipping fast only counts if it survives contact with real users.",
  },
  {
    when: "2022 →",
    title: "Into production teams",
    body: "Software developer roles at Speedwapp and VoxSun Telecom — real systems, real users, real constraints. Backend, integrations and telecom.",
  },
  {
    when: "Now",
    title: "A partner, not a contractor",
    body: "Backend engineering, SaaS architecture and AI systems, end to end — measured in business outcomes. Currently building BoostMyDeal.",
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Bio animation
      if (bioRef.current) {
        const st = { trigger: bioRef.current, start: "top 80%" };
        const bioContent =
          bioRef.current.querySelectorAll("[data-bio-animate]");
        gsap.fromTo(
          bioContent,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: st,
          },
        );

        // Timeline beats slide in from the spine
        const beatItems = bioRef.current.querySelectorAll("[data-beat]");
        gsap.fromTo(
          beatItems,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: st,
          },
        );
      }

      // Stats animation
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll("[data-stat-card]");
        gsap.fromTo(
          statCards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28 relative overflow-hidden"
    >
      {/* Subtle background gradients */}
      <div className="absolute top-1/5 left-0 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/5 right-0 w-80 h-80 bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Bio Section */}
        <div
          ref={bioRef}
          className="grid md:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-28"
        >
          {/* Intro */}
          <div className="md:col-span-5">
            <span
              data-bio-animate
              className="text-orange font-medium text-sm tracking-widest uppercase inline-block mb-5"
            >
              About Me
            </span>
            <h2
              data-bio-animate
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight mb-6"
            >
              Building Systems That{" "}
              <span className="text-orange">Stand the Test of Time</span>
            </h2>
            <p
              data-bio-animate
              className="text-primary-dark/80 text-lg leading-relaxed"
            >
              I'm Emmanuel — a software engineer who thinks like a founder.
              Since 2020 I've helped startups and businesses turn ideas into
              production software, with a focus on backend, SaaS architecture
              and AI systems.
            </p>
          </div>

          {/* Timeline of beats */}
          <div className="md:col-span-7">
            <ol className="relative border-l border-primary-dark/15 ml-3">
              {beats.map((b) => (
                <li
                  key={b.when}
                  data-beat
                  className="relative pl-8 pb-10 last:pb-0"
                >
                  <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-orange ring-4 ring-cream" />
                  <span className="font-serif text-orange text-lg">
                    {b.when}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-primary-dark mt-1 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-primary-dark/75 text-base md:text-lg leading-relaxed">
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Proven in Production */}
        <div ref={statsRef} className="mb-20 md:mb-28">
          <div data-stat-card className="mb-8 max-w-2xl">
            <span className="text-orange font-medium text-sm tracking-widest uppercase mb-3 inline-block">
              Proven in Production
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-dark leading-tight">
              Real roles, real software,{" "}
              <span className="text-orange">shipped to real users</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {roles.map((r) => (
              <div
                key={r.org}
                data-stat-card
                className="bg-white rounded-2xl p-7 shadow-[0_1px_3px_rgba(1,55,85,0.08),0_1px_2px_rgba(1,55,85,0.06)] transition-shadow duration-300 ease-out hover:shadow-[0_6px_16px_-4px_rgba(1,55,85,0.14)]"
              >
                <p className="text-sm font-medium text-orange">{r.when}</p>
                <h4 className="font-serif text-xl md:text-2xl text-primary-dark mt-1">
                  {r.org}
                </h4>
                <p className="text-primary-dark/60 text-sm mb-3">{r.role}</p>
                <p className="text-primary-dark/75 leading-relaxed">{r.line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div ref={techRef} className="mb-20 md:mb-28">
          <div className="text-center mb-10" data-tech-item>
            <h3 className="font-serif text-2xl md:text-3xl text-primary-dark mb-3">
              Technologies I Work With
            </h3>
            <p className="text-primary-dark/70">
              The right tools for the right problems
            </p>
          </div>
          <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-12 animate-marquee shrink-0">
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div
              className="ml-12 flex gap-12 animate-marquee shrink-0"
              aria-hidden="true"
            >
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-12 animate-marquee-reverse shrink-0">
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div
              className="ml-12 flex gap-12 animate-marquee-reverse shrink-0"
              aria-hidden="true"
            >
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-12 animate-marquee shrink-0">
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
            <div
              className="ml-12 flex gap-12 animate-marquee shrink-0"
              aria-hidden="true"
            >
              {icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-text-dark/40 hover:text-text-dark/70 transition-colors duration-300 shrink-0"
                >
                  <Icon size={28} />
                  <span className="text-[15px] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
