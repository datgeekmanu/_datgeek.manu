"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Rocket,
  Wrench,
  ServerCrash,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Pain {
  Icon: LucideIcon;
  situation: string;
  line: string;
}

const pains: Pain[] = [
  {
    Icon: Rocket,
    situation: "The idea is validated.",
    line: "Now it has to become a real product — and you need someone who can build it properly.",
  },
  {
    Icon: Wrench,
    situation: "The prototype works.",
    line: "But it wasn't built for production, and it'll buckle the moment real users arrive.",
  },
  {
    Icon: ServerCrash,
    situation: "The backend is getting fragile.",
    line: "Every change is risky, integrations break, and scaling feels like a gamble.",
  },
  {
    Icon: BrainCircuit,
    situation: "You want AI in your product.",
    line: "But \"add AI\" isn't an architecture — and a demo isn't a system you can ship.",
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-pain]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(["[data-problem-head]", ...items], { opacity: 1, y: 0 });
        return;
      }
      const st = { trigger: sectionRef.current, start: "top 78%" };
      gsap.from("[data-problem-head]", {
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
      id="problem"
      ref={sectionRef}
      className="bg-cream py-20 md:py-28"
      data-purpose="problem"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div data-problem-head className="mb-14 md:mb-16 max-w-2xl">
          <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
            Sound Familiar?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
            You know what you need to build.{" "}
            <span className="text-orange">
              You need someone to own the how.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {pains.map((p) => (
            <div
              key={p.situation}
              data-pain
              className="flex gap-4 bg-white rounded-2xl p-6 md:p-7 shadow-[0_1px_3px_rgba(1,55,85,0.08),0_1px_2px_rgba(1,55,85,0.06)]"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                <p.Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-serif text-lg md:text-xl text-primary-dark leading-snug">
                  {p.situation}
                </p>
                <p className="mt-2 text-primary-dark/70 leading-relaxed">
                  {p.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          data-problem-head
          className="mt-12 text-lg md:text-xl text-primary-dark/80 max-w-2xl leading-relaxed"
        >
          That's the gap I fill — a senior engineer who takes the requirement
          and owns the path to production.
        </p>
      </div>
    </section>
  );
}
