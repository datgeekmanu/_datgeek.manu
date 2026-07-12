"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ExternalLink, TrendingUp, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  positioning: string;
  description: string;
  problem: string;
  outcome: string;
  metrics: string;
  technologies: string[];
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "CloudScale Platform",
    positioning: "Enterprise Infrastructure Dashboard",
    description:
      "A comprehensive cloud infrastructure monitoring and scaling platform that handles 10M+ metrics daily.",
    problem:
      "Engineering teams struggled with fragmented monitoring tools and delayed scaling decisions across their AWS infrastructure.",
    outcome:
      "Reduced mean-time-to-detection by 87%, automated 95% of scaling decisions, and saved $2.4M annually in infrastructure costs.",
    metrics: "10M+ daily metrics | 87% faster detection | $2.4M saved",
    technologies: [
      "Next.js",
      "TypeScript",
      "GraphQL",
      "AWS",
      "Redis",
      "PostgreSQL",
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    link: "/case-studies/cloudscale",
  },
  {
    title: "PayFlow Pro",
    positioning: "Real-time Payment Gateway",
    description:
      "A high-performance payment processing system with sub-millisecond latency and 99.99% uptime SLA.",
    problem:
      "E-commerce businesses experienced payment failures during peak traffic, losing millions in potential revenue each holiday season.",
    outcome:
      "Processed $50M+ in transactions with 99.99% uptime, achieved 0.03% chargeback rate, and increased conversion by 23%.",
    metrics: "$50M+ processed | 99.99% uptime | 23% conversion boost",
    technologies: [
      "Node.js",
      "Go",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Kubernetes",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    link: "/case-studies/payflow",
  },
  {
    title: "DataSync AI",
    positioning: "Enterprise Data Pipeline",
    description:
      "An intelligent data orchestration platform that syncs 500+ data sources with real-time transformation and ML-powered insights.",
    problem:
      "Marketing teams spent 40+ hours weekly manually consolidating data from fragmented sources, leading to delayed decision-making.",
    outcome:
      "Automated 98% of data workflows, reduced time-to-insight from days to minutes, and increased team productivity by 340%.",
    metrics: "500+ sources | 98% automated | 340% productivity gain",
    technologies: [
      "Python",
      "Airflow",
      "Spark",
      "BigQuery",
      "Snowflake",
      "MLflow",
    ],
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    link: "/case-studies/datasync",
  },
];

// Longer than testimonials' 6s — project cards carry more text to read
const ROTATION_MS = 8000;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % projects.length),
      ROTATION_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  // Crossfade the featured project whenever the active index changes
  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );
    },
    { scope: sectionRef, dependencies: [active] },
  );

  const project = projects[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <span className="inline-block text-orange font-medium text-sm tracking-widest uppercase mb-4">
            Selected Work
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-dark leading-tight mb-6">
            Building Systems That <span className="text-orange">Scale</span>
          </h2>
          <p className="text-primary-dark/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Every project focuses on measurable business outcomes—reduced costs,
            faster time-to-market, and sustainable growth.
          </p>
        </div>

        {/* Featured Project Spotlight */}
        <div
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={cardRef}
            key={active}
            className="relative bg-white rounded-3xl shadow-xl shadow-primary-dark/10 p-6 md:p-10 border border-primary-dark/5 flex flex-col md:flex-row items-center gap-6 md:gap-10 min-h-[420px]"
          >
            {/* Project Image */}
            <div className="w-full md:w-2/5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="w-full md:w-3/5 space-y-4">
              <div>
                <span className="text-orange font-medium text-xs uppercase tracking-wider">
                  {project.positioning}
                </span>
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-dark mt-2 mb-3">
                  {project.title}
                </h3>
                <p className="text-primary-dark/70 text-sm md:text-base leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="space-y-3 pt-3 border-t border-primary-dark/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary-dark/60 text-xs font-medium uppercase tracking-wider">
                    <Zap className="w-3 h-3 text-orange" />
                    Challenge
                  </div>
                  <p className="text-primary-dark/70 text-sm leading-relaxed line-clamp-2">
                    {project.problem}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary-dark/60 text-xs font-medium uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3 text-orange" />
                    Impact
                  </div>
                  <p className="text-primary-dark/80 text-sm font-medium leading-relaxed line-clamp-2">
                    {project.outcome}
                  </p>
                  <p className="text-orange text-xs font-semibold mt-1">
                    {project.metrics}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-primary-dark/5 rounded-full text-xs text-primary-dark/70 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-primary-dark font-semibold text-sm group/btn hover:text-orange transition-colors duration-300 mt-2"
              >
                View Case Study
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Project Navigation */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                aria-label={`Show project ${p.title}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "bg-orange text-white shadow-lg shadow-orange/30 scale-105"
                    : "bg-white text-primary-dark/60 hover:text-primary-dark border border-primary-dark/10"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 md:mt-32 text-center">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-primary-dark/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-4xl text-primary-dark mb-4">
                Ready to build something exceptional?
              </h3>
              <p className="text-primary-dark/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help transform your ideas into scalable,
                production-ready solutions that drive real business results.
              </p>
              <a
                href="mailto:holonouemmanuel0@gmail.com"
                className="inline-flex items-center gap-3 bg-orange text-white font-semibold px-8 py-4 rounded-full hover:bg-orange/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-orange/30 group"
              >
                <span>Start a Project</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
