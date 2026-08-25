"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Pause, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  positioning: string;
  description: string;
  problem: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  image: string;
  link: string;
  tone: "orange" | "teal" | "gold";
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
    metrics: [
      { label: "Daily metrics", value: "10M+" },
      { label: "Faster detection", value: "87%" },
      { label: "Saved annually", value: "$2.4M" },
    ],
    technologies: ["Next.js", "TypeScript", "GraphQL", "AWS", "Redis", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    link: "/case-studies/cloudscale",
    tone: "orange",
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
    metrics: [
      { label: "Processed", value: "$50M+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Conversion boost", value: "23%" },
    ],
    technologies: ["Node.js", "Go", "PostgreSQL", "Redis", "Stripe", "Kubernetes"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    link: "/case-studies/payflow",
    tone: "teal",
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
    metrics: [
      { label: "Data sources", value: "500+" },
      { label: "Automated", value: "98%" },
      { label: "Productivity gain", value: "340%" },
    ],
    technologies: ["Python", "Airflow", "Spark", "BigQuery", "Snowflake", "MLflow"],
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    link: "/case-studies/datasync",
    tone: "gold",
  },
];

const toneBg: Record<Project["tone"], string> = {
  orange: "bg-orange",
  teal: "bg-teal",
  gold: "bg-gold",
};

const AUTOPLAY_MS = 5000;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Center the active hero slide by measuring — handles peeks + responsive width.
  const recenter = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    const slide = slideRefs.current[active];
    if (!vp || !track || !slide) return;
    const offset =
      vp.clientWidth / 2 - (slide.offsetLeft + slide.clientWidth / 2);
    track.style.transform = `translate3d(${offset}px,0,0)`;
  }, [active]);

  useLayoutEffect(recenter, [recenter]);
  useEffect(() => {
    window.addEventListener("resize", recenter);
    return () => window.removeEventListener("resize", recenter);
  }, [recenter]);

  // Autoplay — paused on reduced-motion, hover, or explicit pause.
  useEffect(() => {
    if (!playing || prefersReducedMotion()) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % projects.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [playing]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        });
        // Rail fade-in via autoAlpha so it always ends visible (clearProps),
        // and never touches the hero track — that transform is driven by JS.
        gsap.from("[data-rail]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "opacity,visibility,transform",
          scrollTrigger: { trigger: "[data-rail-row]", start: "top 95%" },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cream py-20 md:py-28"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-orange/5 blur-[120px]" />

      <div className="mb-8 px-6 text-center md:mb-10">
        <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-orange">
          Selected Work
        </span>
        <h2
          ref={titleRef}
          className="font-serif text-4xl text-primary-dark md:text-6xl"
        >
          Building Systems That <span className="text-orange">Scale</span>
        </h2>
      </div>

      {/* Tier 1 — hero carousel, full-bleed with peeks */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
      >
        <div
          ref={trackRef}
          data-hero
          className="flex items-stretch gap-2 transition-transform duration-500 ease-out will-change-transform motion-reduce:transition-none"
        >
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <div
                key={p.title}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className={`relative shrink-0 overflow-hidden transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                  isActive ? "opacity-100" : "opacity-55"
                }`}
                style={{ width: "min(72vw, 1180px)" }}
                aria-hidden={!isActive}
              >
                <a
                  href={p.link}
                  tabIndex={isActive ? 0 : -1}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[21/9]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-10">
                      <div className="max-w-xl">
                        <span
                          className={`mb-3 inline-block rounded-full ${toneBg[p.tone]} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
                        >
                          {p.title}
                        </span>
                        <p className="text-lg text-cream md:text-2xl">
                          {p.positioning} — {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier 2 — full-width rail of every project */}
      <div
        data-rail-row
        className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3"
      >
        {projects.map((p, i) => (
          <button
            key={p.title}
            data-rail
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden text-left transition-opacity duration-300 ${
              i === active ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
          >
            <div className="relative aspect-[16/11]">
              <img
                src={p.image}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 to-transparent" />
              <span
                className={`absolute right-2.5 top-2.5 rounded-full ${toneBg[p.tone]} px-2 py-0.5 text-[10px] font-semibold uppercase text-white`}
              >
                {p.metrics[0].value}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <span className="font-serif text-sm text-cream md:text-base">
                  {p.title}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-primary-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Controls — dots centered, play/pause pinned far right (Apple-faithful) */}
      <div className="relative mt-6 h-6 px-6">
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-2">
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                aria-label={`Go to ${p.title}`}
                className={`relative h-2.5 overflow-hidden rounded-full transition-[width] duration-300 ease-out ${
                  isActive ? "w-8" : "w-2.5"
                }`}
                style={{ background: "rgba(1,55,85,0.22)" }}
              >
                {isActive && (
                  <span
                    // key restarts the fill each time the slide changes;
                    // duration matches autoplay, freezes when paused.
                    key={active}
                    className="dot-fill absolute inset-0 rounded-full bg-dark-navy"
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: playing ? "running" : "paused",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute right-6 top-0 flex h-6 w-6 items-center justify-center text-primary-dark/50 transition-colors hover:text-primary-dark"
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>
      </div>
    </section>
  );
}
