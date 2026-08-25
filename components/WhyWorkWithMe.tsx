"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Zap,
  Target,
  Layers,
  MessageSquare,
  Plus,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Value = {
  Icon: LucideIcon;
  no: string;
  lead: string;
  accent: string;
  trail: string;
  tone: "orange" | "teal" | "gold";
  description: string;
  detail: string;
};

const values: Value[] = [
  {
    Icon: Zap,
    no: "01",
    lead: "Ship Without",
    accent: "the Technical ",
    trail: "Debt.",
    tone: "orange",
    description:
      "Build quickly without creating a system you'll have to rewrite six months later.",
    detail: "Load-tested to 10k requests/sec before you ever hit it.",
  },
  {
    Icon: Target,
    no: "02",
    lead: "Architecture That",
    accent: "Fits Your Business",
    trail: ".",
    tone: "teal",
    description:
      "I solve problems that matter. Every technical decision ties back to your business goals and bottom line.",
    detail: "Every sprint maps to a metric on your dashboard.",
  },
  {
    Icon: Layers,
    no: "03",
    lead: "AI Where It",
    accent: "Actually Makes Sense",
    trail: ".",
    tone: "orange",
    description:
      "Integrate RAG, LLMs and intelligent workflows when they create measurable value.",
    detail: "Automations that quietly remove hours of manual work each week.",
  },
];

const toneText: Record<Value["tone"], string> = {
  orange: "text-orange",
  teal: "text-teal",
  gold: "text-gold",
};
const toneBg: Record<Value["tone"], string> = {
  orange: "bg-orange/10 text-orange",
  teal: "bg-teal/10 text-teal",
  gold: "bg-gold/10 text-gold",
};

const MAIL = "mailto:holonouemmanuel0@gmail.com?subject=Let's%20talk";
const reduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Apple-style bottom sheet: slides up, full a11y, animated open/close.
function Sheet({
  value,
  onClose,
}: {
  value: Value;
  onClose: () => void;
}) {
  const scrimRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const requestClose = useCallback(() => {
    const scrim = scrimRef.current;
    const panel = panelRef.current;
    if (!scrim || !panel || reduce()) {
      onClose();
      return;
    }
    gsap.to(scrim, { opacity: 0, duration: 0.15, ease: "power2.in" });
    gsap.to(panel, {
      yPercent: 24,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const scrim = scrimRef.current!;
    const panel = panelRef.current!;
    if (reduce()) {
      gsap.set([scrim, panel], { opacity: 1, yPercent: 0 });
    } else {
      gsap.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { yPercent: 14, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
      );
    }
    return () => {
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      requestClose();
      return;
    }
    if (e.key !== "Tab") return;
    const f = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!f || !f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-end md:items-center p-0 md:p-6"
      onKeyDown={onKeyDown}
    >
      <div
        ref={scrimRef}
        onClick={requestClose}
        className="absolute inset-0 bg-primary-dark/50 backdrop-blur-sm"
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="why-modal-title"
        className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-8 md:p-12 max-h-[88vh] overflow-y-auto"
      >
        <button
          ref={closeRef}
          onClick={requestClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-primary-dark text-white grid place-items-center hover:scale-105 active:scale-95 transition-transform duration-200 motion-reduce:transition-none"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${toneBg[value.tone]}`}
        >
          <value.Icon className="w-6 h-6" />
        </div>
        <h2
          id="why-modal-title"
          className="font-serif text-3xl md:text-4xl text-primary-dark mb-6"
        >
          {cap(value.accent)}
        </h2>

        <p className="font-semibold text-primary-dark mb-1">The approach.</p>
        <p className="text-primary-dark/75 leading-relaxed mb-6">
          {value.description}
        </p>

        <p className="font-semibold text-primary-dark mb-1">What you get.</p>
        <p className={`leading-relaxed mb-8 ${toneText[value.tone]}`}>
          {value.detail}
        </p>

        <a
          href={MAIL}
          className="inline-flex items-center gap-2 font-semibold text-orange group"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      if (reduce()) {
        gsap.set(["[data-head]", ...cards], { opacity: 1, y: 0 });
        return;
      }
      const st = { trigger: sectionRef.current, start: "top 80%" };
      gsap.from("[data-head]", { y: 24, opacity: 0, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(cards, {
        y: 28,
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
      ref={sectionRef}
      className="bg-cream py-20 md:py-28"
      data-purpose="why-work-with-me"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div data-head className="mb-14 md:mb-20 max-w-2xl">
          <span className="text-orange font-medium text-sm tracking-widest uppercase mb-4 inline-block">
            Why Work With Me
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark leading-tight">
            Engineering Meets <span className="text-orange">Business Value</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {values.map((val, i) => (
            <article
              key={val.no}
              data-card
              className="relative bg-white rounded-2xl p-8 flex flex-col min-h-[220px] shadow-[0_1px_3px_rgba(1,55,85,0.08),0_1px_2px_rgba(1,55,85,0.06)] transition-shadow duration-300 ease-out hover:shadow-[0_6px_16px_-4px_rgba(1,55,85,0.14)]"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-8 ${toneBg[val.tone]}`}
              >
                <val.Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-primary-dark leading-snug pr-10">
                {val.lead && `${val.lead} `}
                <span className={toneText[val.tone]}>{val.accent}</span>
                {val.trail}
              </h3>

              <button
                onClick={() => setOpen(i)}
                aria-label={`More about ${val.accent}`}
                aria-haspopup="dialog"
                className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-primary-dark text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 motion-reduce:transition-none"
              >
                <Plus className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {open !== null && (
        <Sheet value={values[open]} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
