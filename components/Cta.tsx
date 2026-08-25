"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MONTH = "October";
const START_DOW = 3; // month starts Wednesday (0=Sun)
const DAYS = 31;
const OPEN_DAYS = [8, 14, 15, 22, 29];

const body =
  "Let's discuss your requirements and build something great together. Book a free consultation today.";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<number | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-panel],[data-anim],[data-card]", { opacity: 1, y: 0, scale: 1 });
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
        .from("[data-anim]", { y: 18, opacity: 0, duration: 0.45, stagger: 0.08 }, "-=0.3")
        .from("[data-card]", { y: 24, opacity: 0, scale: 0.96, duration: 0.5 }, "-=0.35");

      // Tall sections + async images/fonts above shift layout after the trigger
      // measures; refresh once the page settles so the reveal always fires.
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
    },
    { scope: sectionRef },
  );

  const label = picked ? `Book ${MONTH.slice(0, 3)} ${picked} · Free Call` : "Book a Free Consultation";
  const href = picked
    ? `mailto:holonouemmanuel0@gmail.com?subject=${encodeURIComponent(`Free consultation — ${MONTH} ${picked}`)}`
    : "mailto:holonouemmanuel0@gmail.com?subject=Free%20consultation";

  const cells = [
    ...Array.from({ length: START_DOW }, () => null),
    ...Array.from({ length: DAYS }, (_, i) => i + 1),
  ];

  return (
    <section
      ref={sectionRef}
      className="pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-purpose="cta-section"
    >
      <h2 className="font-serif text-3xl md:text-5xl font-black text-primary-dark tracking-tight mb-8">
        Ready to bring your project <span className="text-orange">to life?</span>
      </h2>

      <div
        data-panel
        className="relative rounded-[2rem] overflow-hidden shadow-2xl min-h-[380px] md:min-h-[440px] bg-[linear-gradient(105deg,#e9e3d8_0%,#efd9c2_45%,var(--orange)_100%)]"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center h-full p-8 md:p-14">
          <div className="max-w-md">
            <p data-anim className="text-primary-dark text-xl md:text-2xl font-serif leading-snug mb-3">
              {body}
            </p>
            <p data-anim className="text-primary-dark/70 text-sm mb-8">
              {picked
                ? `${MONTH} ${picked} selected — replies within 24h.`
                : "Pick an open day to lock your slot."}
            </p>
            <Link
              data-anim
              href={href}
              className="inline-flex items-center px-7 py-3.5 bg-primary-dark text-white font-semibold rounded-full shadow-[0_1px_2px_rgba(1,55,85,0.15)] hover:shadow-[0_4px_12px_rgba(1,55,85,0.22)] active:scale-[0.97] motion-reduce:active:scale-100 transition-shadow duration-200"
            >
              <CalendarDays className="mr-2 w-[18px] h-[18px]" />
              {label}
            </Link>
          </div>

          {/* Interactive date picker */}
          <div className="flex md:justify-end">
            <div
              data-card
              className="w-full max-w-xs bg-white/30 border border-white/40 rounded-2xl p-5 backdrop-blur-md shadow-xl"
            >
              <p className="font-serif text-primary-dark mb-3">{MONTH}</p>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-primary-dark/50 mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (d === null) return <span key={i} />;
                  const open = OPEN_DAYS.includes(d);
                  const on = picked === d;
                  return (
                    <button
                      key={i}
                      disabled={!open}
                      onClick={() => setPicked(d)}
                      aria-pressed={on}
                      className={`h-8 rounded-lg text-sm transition-colors duration-150 ${
                        on
                          ? "bg-primary-dark text-white font-semibold"
                          : open
                            ? "bg-white/70 text-primary-dark font-medium hover:bg-white cursor-pointer"
                            : "text-primary-dark/30 cursor-default"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-primary-dark/70 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-white/80 inline-block" />
                Open days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
