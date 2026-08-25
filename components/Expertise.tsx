"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    no: "01",
    title: "Product Engineering",
    description:
      "Web applications, SaaS platforms, APIs and internal tools built around your actual business requirements.",
    tagline: "Your idea into a working product.",
    stack: "React • Node • Postgres",
  },
  {
    no: "02",
    title: "Backend & System Architecture",
    description:
      "Design APIs, databases, authentication, queues, integrations and distributed services that won't collapse when usage grows.",
    tagline: "The foundation your product can grow on.",
    stack: "APIs • Queues • Observability",
  },
  {
    no: "03",
    title: "AI & Intelligent Systems",
    description:
      "RAG systems, document processing, AI agents and intelligent automation integrated into existing products.",
    tagline: "Add AI where it creates real business value.",
    stack: "OpenAI • Langchain • Python • AI Agents",
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(rows, {
        y: 24,
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-cream px-6 md:px-20 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16 max-w-3xl">
          <p className="text-orange font-medium mb-4">Expertise</p>
          <h2 className="text-4xl md:text-6xl leading-[1.05] font-serif text-primary-dark">
            I help companies build{" "}
            <span className="text-orange font-semibold">
              reliable &amp; scalable
            </span>{" "}
            software systems.
          </h2>
        </div>

        <div className="border-t border-primary-dark/15">
          {features.map((f) => (
            <article
              key={f.no}
              data-row
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 border-b border-primary-dark/15"
            >
              <div className="md:col-span-1">
                <span className="text-2xl font-serif text-orange/60 group-hover:text-orange transition-colors duration-200">
                  {f.no}
                </span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark leading-tight">
                  {f.title}
                </h3>
                <p className="mt-4 text-xl text-orange font-serif">
                  {f.tagline}
                </p>
              </div>
              <div className="md:col-span-6 flex flex-col justify-between">
                <p className="text-primary-dark/90 text-lg md:text-xl leading-relaxed">
                  {f.description}
                </p>
                <p className="mt-6 text-sm tracking-wide uppercase text-primary-dark/60">
                  {f.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
