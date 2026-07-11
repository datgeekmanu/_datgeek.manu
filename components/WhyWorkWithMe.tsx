"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Zap,
  Target,
  Layers,
  MessageSquare,
  ArrowRight,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Ship Fast, Scale Confidently",
    description: "Modern architecture from day one. Clean, maintainable code that grows with your product without technical debt.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Business-First Engineering",
    description: "I solve problems that matter. Every technical decision ties back to your business goals and bottom line.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Clean Architecture + AI Automation",
    description: "Systems designed for clarity and extensibility. Intelligent automation that handles the repetitive work.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Clear Communication, Reliable Delivery",
    description: "You'll always know where we stand. Transparent updates, realistic timelines, and no surprises.",
  },
];

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !titleRef.current) return;

      // Title animation
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
        }
      );

      // Card stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-feature-card]");
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-cream py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-teal/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
            Why Work With Me
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
            Engineering Meets{" "}
            <span className="text-orange">Business Value</span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature-card
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--x",
                  `${e.clientX - rect.left}px`,
                );
                e.currentTarget.style.setProperty(
                  "--y",
                  `${e.clientY - rect.top}px`,
                );
              }}
              className="group relative bg-white rounded-2xl md:rounded-3xl p-7 md:p-10 shadow-lg shadow-primary-dark/5 hover:shadow-xl hover:shadow-primary-dark/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Mouse-follow spotlight glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(232, 100, 26, 0.1), transparent 65%)",
                }}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-5 group-hover:bg-orange/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-primary-dark mb-3 group-hover:text-orange transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-primary-dark/70 text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
