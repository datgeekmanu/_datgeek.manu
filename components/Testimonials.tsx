"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    company: "Nexus Analytics",
    text: "Emmanuel joined us during a critical growth phase and completely transformed our data pipeline. What impressed me most was his ownership mindset—he treated our product like his own. Communication was crystal clear throughout, and he delivered a scalable solution that's still running 18 months later with zero downtime.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "CTO",
    company: "PayStack Pro",
    text: "I've worked with many engineers, but Emmanuel stands out for his ability to bridge business requirements with technical excellence. He built our payment gateway from scratch and it's now processing millions in daily transactions. Clean architecture, thorough testing, and he actually listens to what the business needs.",
    avatar: "MR",
  },
  {
    name: "Jennifer Okonkwo",
    role: "Head of Product",
    company: "ScaleFlow",
    text: "The reliability factor. That's what you get with Emmanuel. Deadlines are never missed, updates are always prompt, and the code quality is production-ready from day one. He scaled our platform from 10K to 500K users without a single hiccup. The kind of partner every startup needs.",
    avatar: "JO",
  },
];

const ROTATION_MS = 6000;

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    // Don't auto-advance for users who opted out of motion (WCAG 2.2.2)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      ROTATION_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
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

  // Fade the featured quote in whenever the active testimonial changes
  useGSAP(
    () => {
      if (!quoteRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power1.out" },
        );
      });
    },
    { scope: sectionRef, dependencies: [active] },
  );

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-20 md:py-28 relative overflow-hidden"
    >
      {/* Subtle background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
            What People Say
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
            Trusted by <span className="text-orange">Founders & Teams</span>
          </h2>
        </div>

        {/* Featured Quote Spotlight */}
        <div
          className="max-w-4xl mx-auto text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div ref={quoteRef} key={active}>
            <Quote className="w-10 h-10 md:w-14 md:h-14 text-orange/30 mx-auto mb-8" />
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-dark leading-relaxed md:leading-relaxed min-h-[220px] md:min-h-[200px]">
              &ldquo;{current.text}&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="text-primary-dark font-semibold text-lg">
                {current.name}
              </p>
              <p className="text-primary-dark/60 text-sm">
                {current.role}, {current.company}
              </p>
            </div>
          </div>

          {/* Avatar Navigation */}
          <div className="mt-10 flex items-center justify-center gap-4">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange to-orange/80 flex items-center justify-center text-white font-serif text-base md:text-lg font-semibold shadow-lg shadow-orange/20 transition duration-300 cursor-pointer ${
                  i === active
                    ? "scale-110 ring-2 ring-orange ring-offset-4 ring-offset-cream"
                    : "opacity-40 hover:opacity-80 scale-90"
                }`}
              >
                {t.avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-dark/10">
            <div className="flex -space-x-2">
              {testimonials.map((t) => (
                <div
                  key={t.avatar}
                  className="w-8 h-8 rounded-full border-2 border-cream bg-gradient-to-br from-orange to-orange/80 flex items-center justify-center text-white text-xs font-semibold"
                >
                  {t.avatar}
                </div>
              ))}
            </div>
            <span className="text-primary-dark/70 text-sm font-medium">
              Delivered for 50+ satisfied clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
