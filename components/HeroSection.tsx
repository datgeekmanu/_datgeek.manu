"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroWorkingAnimation from "./HeroWorkingAnimation";
import ParticleBackground from "./ParticleBackground";
import { ArrowRight, Braces } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // First-paint entrance: bridge the hard-cut so the hero doesn't teleport
  // while every scrolled-into section fades up. One fast beat — hero holds LCP.
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const items =
        sectionRef.current.querySelectorAll<HTMLElement>("[data-hero-reveal]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(items, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(items, { opacity: 0, duration: 0.4, stagger: 0.06 });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream text-center px-5 pt-15 pb-12"
    >
      <ParticleBackground />
      <div className="flex justify-center h-28 mb-8">
        <HeroWorkingAnimation />
      </div>

      <span
        data-hero-reveal
        className="text-[20px] bg-white rounded-full py-4 px-6 text-primary-dark font-semibold"
      >
        Software Engineer. Tech Enthusiast.
      </span>

      <h1
        data-hero-reveal
        className="font-serif text-[clamp(32px,5vw,64px)] leading-[1.15] text-primary-dark max-w-3/5 mx-auto mt-8"
      >
        Build Production-Ready Software That Scales{" "}
        <span className="text-orange">From Idea to Production.</span>
      </h1>

      <p
        data-hero-reveal
        className="text-primary-dark text-[20px] font-medium max-w-3/6 mx-auto mt-12 break-words leading-relaxed"
      >
        I design and build scalable web applications, APIs, and data pipelines.
        Specializing in full-stack development with modern frameworks and cloud infrastructure.
      </p>

      <div data-hero-reveal className="flex justify-center mt-5">
        <Link
        href="mailto:holonouemmanuel0@gmail.com"
        className="flex items-center text-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange/90 transition duration-150 active:scale-[0.97] motion-reduce:active:scale-100"
      >
        <span className="bg-white rounded-full text-orange flex justify-center items-center w-[40px] h-[40px]">
          <Braces />
        </span>
        <span className="text-[20px]">Contact me</span>
        <ArrowRight />
      </Link>
      </div>
    </section>
  );
}
