"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code, Target, Zap, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    Icon: Code,
    title: "Ship Quality Code",
    description:
      "Production-ready, tested, and documented. No corners cut that someone pays for later.",
  },
  {
    Icon: Target,
    title: "Think in Outcomes",
    description:
      "Technology is a means, not the point. Every decision ties back to your business result.",
  },
  {
    Icon: Zap,
    title: "Move with Purpose",
    description:
      "Fast execution without chaos — clear priorities, realistic timelines, steady progress.",
  },
];

// Real client/colleague quotes only. Empty until sourced — never fabricated.
// Drop entries in { quote, name, role } and the block renders automatically.
const testimonials: { quote: string; name: string; role: string }[] = [];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-proof]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(["[data-proof-head]", ...items], { opacity: 1, y: 0 });
        return;
      }
      const st = { trigger: sectionRef.current, start: "top 80%" };
      gsap.from("[data-proof-head]", {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: st,
      });
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: st,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div data-proof-head className="mb-14 md:mb-16 max-w-2xl">
          <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
            How I Work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
            Principles that guide{" "}
            <span className="text-orange">every project</span>
          </h2>
        </div>

        {/* Principles — how I work */}
        <div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {principles.map((p) => (
              <div
                key={p.title}
                data-proof
                className="group bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(1,55,85,0.08),0_1px_2px_rgba(1,55,85,0.06)] transition-shadow duration-300 ease-out hover:shadow-[0_6px_16px_-4px_rgba(1,55,85,0.14)]"
              >
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-5 group-hover:bg-orange/20 transition-colors">
                  <p.Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-primary-dark mb-3 group-hover:text-orange transition-colors">
                  {p.title}
                </h4>
                <p className="text-primary-dark/70 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials — renders only when real quotes exist */}
        {testimonials.length > 0 && (
          <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                data-proof
                className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(1,55,85,0.08),0_1px_2px_rgba(1,55,85,0.06)]"
              >
                <Quote className="w-8 h-8 text-orange/30 mb-4" />
                <blockquote className="font-serif text-lg text-primary-dark leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-primary-dark">
                    {t.name}
                  </span>
                  <span className="text-primary-dark/60"> — {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
