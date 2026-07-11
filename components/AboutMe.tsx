"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code, Zap, Target, Award, Briefcase, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 8,
    prefix: "",
    suffix: "+",
    label: "Years Experience",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    value: 50,
    prefix: "",
    suffix: "+",
    label: "Projects Delivered",
    icon: <Award className="w-5 h-5" />,
  },
  {
    value: 10,
    prefix: "$",
    suffix: "M+",
    label: "Revenue Impact",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    value: 99.9,
    prefix: "",
    suffix: "%",
    label: "Client Satisfaction",
    icon: <Zap className="w-5 h-5" />,
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

const principles = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Ship Quality Code",
    description:
      "I don't cut corners. Every line I write is production-ready, tested, and documented.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Think in Outcomes",
    description:
      "Technology is a means, not an end. I focus on what matters—business results.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Move with Purpose",
    description:
      "Fast execution without chaos. Clear priorities, realistic timelines, and steady progress.",
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Bio animation
      if (bioRef.current) {
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
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
            },
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

        // Count-up values (SSR renders final text; JS animates from 0)
        const values =
          statsRef.current.querySelectorAll<HTMLElement>("[data-stat-value]");
        values.forEach((el) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = (el.dataset.value ?? "").includes(".") ? 1 : 0;
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const counter = { n: 0 };
          gsap.to(counter, {
            n: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
            },
          });
        });
      }

      // Principles animation
      if (principlesRef.current) {
        const principleCards = principlesRef.current.querySelectorAll(
          "[data-principle-card]",
        );
        gsap.fromTo(
          principleCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: principlesRef.current,
              start: "top 80%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
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
          className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-28"
        >
          <div className="space-y-6" data-bio-animate>
            <span className="text-orange font-medium text-sm tracking-widest uppercase">
              About Me
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
              Building Systems That{" "}
              <span className="text-orange">Stand the Test of Time</span>
            </h2>
          </div>
          <div
            className="space-y-4 text-primary-dark/80 text-lg leading-relaxed"
            data-bio-animate
          >
            <p>
              I'm Emmanuel—a software engineer who thinks like a founder. Over
              the past 8 years, I've helped startups and businesses transform
              ideas into scalable, production-ready software.
            </p>
            <p>
              My expertise lies in backend architecture, data infrastructure,
              and integrating AI into real-world workflows. But more
              importantly, I understand that great engineering is about solving
              business problems, not writing clever code.
            </p>
            <p>
              When I join a project, I become a partner in your success. I bring
              clarity to complexity, deliver on commitments, and build systems
              that scale gracefully with your growth.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              data-stat-card
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-lg shadow-primary-dark/5 hover:shadow-xl hover:shadow-primary-dark/10 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-orange/10 rounded-xl flex items-center justify-center text-orange group-hover:bg-orange/20 transition-colors">
                {stat.icon}
              </div>
              <div
                data-stat-value
                data-value={stat.value}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
                className="font-serif text-3xl md:text-4xl text-primary-dark mb-2 group-hover:text-orange transition-colors"
              >
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-primary-dark/60 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
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

        {/* Working Philosophy */}
        <div ref={principlesRef}>
          <div className="text-center mb-12" data-principle-card>
            <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
              How I Work
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary-dark">
              Principles That Guide{" "}
              <span className="text-orange">Every Project</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                data-principle-card
                className="group relative bg-gradient-to-br from-white to-white/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-lg shadow-primary-dark/5 hover:shadow-xl hover:shadow-primary-dark/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange/20 transition-colors">
                    {principle.icon}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-primary-dark mb-4 group-hover:text-orange transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-primary-dark/70 text-base md:text-lg leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                {/* Decorative accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
