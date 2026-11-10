"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BOOKING_URL } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

const body =
  "Tell me what you're building. I'll help you figure out the technical path forward — architecture, stack, and how to ship it.";

const work = [
  { title: "BoostMyDeal", tint: "from-orange to-[#c9500f]" },
  { title: "Voice AI Platform", tint: "from-teal to-[#155e54]" },
  { title: "Document Processor", tint: "from-gold to-[#c17d0a]" },
];

export default function CtaShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-panel],[data-anim],[data-tile]", { opacity: 1, y: 0, scale: 1, rotate: 0 });
        return;
      }
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .from("[data-panel]", { y: 24, opacity: 0, duration: 0.55 })
        .from("[data-tile]", { y: 30, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from("[data-anim]", { y: 18, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.35");

      // Tall sections + async images/fonts above shift layout after the trigger
      // measures; refresh once the page settles so the reveal always fires.
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-purpose="cta-showcase"
    >
      <h2 className="font-serif text-3xl md:text-5xl font-black text-primary-dark tracking-tight mb-8">
        Ready to bring your project <span className="text-orange">to life?</span>
      </h2>

      <div
        data-panel
        className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[380px] md:min-h-[440px] bg-[linear-gradient(255deg,#e9e3d8_0%,#efd9c2_45%,var(--orange)_100%)]"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center h-full p-8 md:p-14">
          {/* Fanning thumbnail stack (hero, left) */}
          <div className="order-2 md:order-1 group flex justify-center md:justify-start">
            <div className="relative w-64 h-64">
              {work.map((w, i) => (
                <div
                  key={w.title}
                  data-tile
                  style={{
                    zIndex: work.length - i,
                    ["--r" as string]: `${(i - 1) * 8}deg`,
                    ["--x" as string]: `${(i - 1) * 18}px`,
                  }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${w.tint} shadow-xl p-5 flex flex-col justify-end text-white origin-bottom
                    [transform:translateX(var(--x))_rotate(var(--r))]
                    group-hover:[transform:translateX(calc(var(--x)*1.7))_rotate(calc(var(--r)*1.6))]
                    transition-transform duration-300 ease-out motion-reduce:transition-none`}
                >
                  <span className="text-xs uppercase tracking-wide opacity-80">Project</span>
                  <span className="font-serif text-xl leading-tight">{w.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy, right */}
          <div className="order-1 md:order-2 max-w-md md:justify-self-end md:text-right">
            <p data-anim className="text-primary-dark text-xl md:text-2xl font-serif leading-snug mb-8">
              {body}
            </p>
            <Link
              data-anim
              href={BOOKING_URL}
              className="inline-flex items-center px-7 py-3.5 bg-primary-dark text-white font-semibold rounded-full shadow-[0_1px_2px_rgba(1,55,85,0.15)] hover:shadow-[0_4px_12px_rgba(1,55,85,0.22)] active:scale-[0.97] motion-reduce:active:scale-100 transition-shadow duration-200 group/btn"
            >
              <CalendarDays className="mr-2 w-[18px] h-[18px]" />
              Discuss Your Project
              <ArrowRight className="ml-2 w-[18px] h-[18px] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <p data-anim className="mt-5 text-sm text-primary-dark/70 leading-relaxed">
              We can start small — a paid scoping engagement that gives you a
              clear architecture and estimate before any bigger commitment. You
              work directly with me, not an account manager.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
