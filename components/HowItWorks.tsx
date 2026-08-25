"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Search,
  Ruler,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  no: string;
  title: string;
  description: string;
  deliverable: string;
  duration: string;
  Icon: LucideIcon;
  note?: string;
}

const steps: ProcessStep[] = [
  {
    no: "01",
    title: "Kickoff & Research",
    description: "Understanding your vision, users, and business goals.",
    deliverable: "Discovery doc",
    duration: "Week 1",
    Icon: Search,
  },
  {
    no: "02",
    title: "Planning & Architecture",
    description:
      "Designing backend APIs and infrastructure that are robust, efficient, and growth-oriented.",
    deliverable: "System design",
    duration: "Week 2",
    Icon: Ruler,
  },
  {
    no: "03",
    title: "Design",
    description:
      "Crafting intuitive, user-friendly interfaces that align with your brand and delight users.",
    deliverable: "UI kit + prototype",
    duration: "Weeks 3–4",
    Icon: Palette,
  },
  {
    no: "04",
    title: "Development",
    description:
      "Building and deploying high-quality software using modern technologies and best practices.",
    deliverable: "Shipped features",
    duration: "Weeks 5–10",
    Icon: Code2,
  },
  {
    no: "05",
    title: "Quality Assurance",
    description:
      "Ensuring the software meets the highest standards through rigorous testing and validation.",
    deliverable: "Test suite + fixes",
    duration: "Week 11",
    Icon: ShieldCheck,
    note: "Bug fixes and optimizations included",
  },
  {
    no: "06",
    title: "Launch & Delivery",
    description:
      "Deploying to production and providing ongoing support for a smooth, successful launch.",
    deliverable: "Production launch",
    duration: "Week 12",
    Icon: Rocket,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-block]").forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-cream px-6 py-24 md:px-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <span className="mb-4 inline-block rounded-sm border border-primary-dark/20 px-3 py-1 text-xs font-semibold text-primary-dark">
            How it works
          </span>
          <h2 className="font-serif text-3xl tracking-tighter text-primary-dark lg:text-5xl">
            From Idea to Launch
          </h2>
          <p className="mt-2 max-w-xl text-lg leading-relaxed tracking-tight text-primary-dark/70">
            A clear, structured approach to building scalable digital products.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          {/* Left — pinned mock screen (desktop) */}
          <div className="hidden md:block">
            <div className="sticky top-24 h-[62vh]">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#03222f] shadow-2xl">
                {/* title bar */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                {/* stacked screens crossfade */}
                {steps.map((s, i) => (
                  <div
                    key={s.no}
                    className="absolute inset-x-0 bottom-0 top-[45px] p-8 transition-opacity duration-300 ease-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                      <s.Icon className="h-7 w-7" />
                    </div>
                    <div className="mt-6 font-mono text-xs text-cream/40">
                      {s.no} · {s.duration}
                    </div>
                    <div className="mt-2 font-serif text-3xl text-cream">
                      {s.title}
                    </div>
                    {/* skeleton "content" lines */}
                    <div className="mt-8 space-y-3">
                      <div className="h-2.5 w-4/5 rounded-full bg-cream/15" />
                      <div className="h-2.5 w-3/5 rounded-full bg-cream/10" />
                      <div className="h-2.5 w-2/3 rounded-full bg-cream/10" />
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange/15 px-4 py-2 font-mono text-sm text-orange">
                      ✓ {s.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — scrolling text */}
          <div>
            {steps.map((s, i) => (
              <div
                key={s.no}
                data-block
                className="flex min-h-[50vh] flex-col justify-center border-b border-primary-dark/10 py-8 transition-opacity duration-300 last:border-b-0 md:min-h-[62vh]"
                style={{ opacity: i === active ? 1 : 0.45 }}
              >
                <div className="flex items-center gap-3 md:hidden">
                  <s.Icon className="h-5 w-5 text-orange" />
                  <span className="font-mono text-xs text-orange">{s.no}</span>
                </div>
                <span className="mt-2 text-xs font-medium text-orange md:mt-0">
                  {s.duration}
                </span>
                <h4 className="mt-1 font-serif text-2xl text-primary-dark md:text-4xl">
                  {s.title}
                </h4>
                <p className="mt-3 max-w-md text-primary-dark/70 md:text-lg">
                  {s.description}
                </p>
                <p className="mt-3 text-sm text-primary-dark/45">
                  → {s.deliverable}
                  {s.note ? ` · ${s.note}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
