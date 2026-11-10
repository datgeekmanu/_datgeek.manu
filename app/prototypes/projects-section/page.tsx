"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/* Shared prototype data — copied into the harness, never imported     */
/* from production. Real project content.                              */
/* ------------------------------------------------------------------ */

type Tone = "orange" | "teal" | "gold";

interface Project {
  title: string;
  positioning: string;
  description: string;
  problem: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  image: string;
  link: string;
  tone: Tone;
}

const BOOKING_URL = "#book";

const projects: Project[] = [
  {
    title: "BoostMyDeal",
    positioning: "AI-powered deal discovery SaaS",
    description:
      "An end-to-end AI product for discovering and surfacing deals — built from the backend up.",
    problem:
      "Turning an AI product idea into a real, billable SaaS means owning the backend, the RAG layer, the voice pipeline, the dashboard and the infrastructure — not just wiring up an API.",
    outcome:
      "I built the backend, the RAG system, the LiveKit voice API and agent, and the frontend dashboard — working across the architecture and infrastructure. Currently in beta.",
    metrics: [
      { label: "Scope", value: "End-to-end" },
      { label: "Type", value: "AI SaaS" },
      { label: "Status", value: "Beta" },
    ],
    technologies: [
      "Next.js",
      "Laravel",
      "FastAPI",
      "LangChain",
      "Qdrant",
      "Stripe",
      "Docker",
    ],
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80",
    link: BOOKING_URL,
    tone: "orange",
  },
  {
    title: "Voice AI Platform",
    positioning: "Multi-tenant voice AI assistant SaaS",
    description:
      "A B2B platform where businesses run their own AI voice assistant, backed by a private knowledge base.",
    problem:
      "Real-time voice AI on top of a multi-tenant SaaS touches everything at once — transport, the agent pipeline, a RAG knowledge base, billing and tenant isolation.",
    outcome:
      "Built across a Laravel API and Next.js dashboard with LiveKit voice transport, an AI agent pipeline, a Qdrant-backed RAG knowledge base, Stripe billing, multi-tenancy and background workers.",
    metrics: [
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Domain", value: "Voice AI" },
      { label: "Billing", value: "Stripe" },
    ],
    technologies: [
      "Laravel",
      "Next.js",
      "LiveKit",
      "PostgreSQL",
      "Redis",
      "Qdrant",
      "Stripe",
    ],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80",
    link: BOOKING_URL,
    tone: "teal",
  },
  {
    title: "Intelligent Document Processor",
    positioning: "Document-processing backend (in progress)",
    description:
      "A production-grade backend for turning passports, invoices and PDFs into structured data through an API.",
    problem:
      "Extracting structured data from documents reliably means an event-driven pipeline: object storage, queues, classification, validation, extraction and async result retrieval — not a single script.",
    outcome:
      "An engineering platform built on FastAPI microservices, Kafka, Cloudflare R2 and Qdrant, with background workers and asynchronous jobs. Document → storage → queue → processing → structured result.",
    metrics: [
      { label: "Design", value: "Event-driven" },
      { label: "Processing", value: "Async" },
      { label: "Domain", value: "Document AI" },
    ],
    technologies: [
      "FastAPI",
      "Kafka",
      "Qdrant",
      "Cloudflare R2",
      "Docker",
      "Python",
    ],
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=80",
    link: BOOKING_URL,
    tone: "gold",
  },
];

const toneText: Record<Tone, string> = {
  orange: "text-orange",
  teal: "text-teal",
  gold: "text-gold",
};
const toneBg: Record<Tone, string> = {
  orange: "bg-orange",
  teal: "bg-teal",
  gold: "bg-gold",
};

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================================================================== */
/* Variant 1 — Cinematic  (Apple-style horizontal pin + scrub)         */
/* Section pins; projects sweep sideways as you scroll down. Full-bleed */
/* panels, oversized serif, parallax image, progress bar.              */
/* ================================================================== */

function Cinematic() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(t, { x: () => -distance(), ease: "none" });
        if (bar.current)
          tl.to(bar.current, { scaleX: 1, ease: "none" }, 0);

        // Per-panel parallax on the image layer.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-dark-navy">
      <div
        ref={track}
        className="flex h-full w-max motion-reduce:w-full motion-reduce:flex-col motion-reduce:overflow-auto"
      >
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="relative flex h-screen w-screen shrink-0 items-end overflow-hidden motion-reduce:h-[70vh]"
          >
            <div
              data-parallax
              className="absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/40 to-dark-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/50 to-transparent" />

            <div className="relative z-10 w-full px-8 pb-20 md:px-20 md:pb-28">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-serif text-lg text-cream/60">
                  0{i + 1} <span className="text-cream/30">/ 0{projects.length}</span>
                </span>
                <span className="h-px w-16 bg-cream/25" />
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${toneText[p.tone]}`}
                >
                  {p.positioning}
                </span>
              </div>
              <h3 className="max-w-4xl font-serif text-5xl leading-[0.95] text-cream md:text-8xl">
                {p.title}
              </h3>
              <p className="mt-6 max-w-xl text-base text-cream/70 md:text-lg">
                {p.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-serif text-xl text-cream md:text-2xl">
                      {m.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-cream/45">
                      {m.label}
                    </div>
                  </div>
                ))}
                <a
                  href={p.link}
                  className="group ml-auto hidden items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-dark-navy md:inline-flex"
                >
                  View project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Fixed heading + scroll progress over the pinned stage */}
      <div className="pointer-events-none absolute left-8 top-10 z-20 md:left-20 md:top-14">
        <span className="text-xs font-medium uppercase tracking-widest text-orange">
          Selected Work
        </span>
      </div>
      <div className="absolute inset-x-8 bottom-8 z-20 h-px bg-cream/15 md:inset-x-20 motion-reduce:hidden">
        <span
          ref={bar}
          className="block h-full origin-left scale-x-0 bg-orange"
        />
      </div>
    </section>
  );
}

/* ================================================================== */
/* Variant 2 — Scrollytelling  (Apple sticky meta + scrolling media)   */
/* Left column pins; the big index/title/metrics swap as each tall     */
/* media block on the right passes the centre line.                    */
/* ================================================================== */

function Scrollytelling() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(i),
        });
        if (!reduced()) {
          gsap.fromTo(
            panel.querySelector("[data-media]"),
            { scale: 1.1, y: 40 },
            {
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top center",
                scrub: true,
              },
            },
          );
        }
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  const p = projects[active];

  return (
    <section ref={root} className="relative w-full bg-cream py-24 md:py-0">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        {/* Sticky meta */}
        <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center">
          <span className="text-xs font-medium uppercase tracking-widest text-orange">
            Selected Work
          </span>
          <div key={active} className="proto-swap mt-6">
            <span className="font-serif text-7xl text-primary-dark/12 md:text-9xl">
              0{active + 1}
            </span>
            <span
              className={`mt-2 block text-xs font-semibold uppercase tracking-widest ${toneText[p.tone]}`}
            >
              {p.positioning}
            </span>
            <h3 className="mt-3 font-serif text-4xl leading-tight text-primary-dark md:text-6xl">
              {p.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary-dark/70">
              {p.outcome}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-serif text-xl text-primary-dark">
                    {m.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-primary-dark/45">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* progress ticks */}
          <div className="mt-9 flex gap-2">
            {projects.map((pr, i) => (
              <span
                key={pr.title}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active
                    ? `w-10 ${toneBg[pr.tone]}`
                    : "w-4 bg-primary-dark/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrolling media */}
        <div className="flex flex-col gap-6 pb-10 md:gap-0 md:py-[20vh]">
          {projects.map((pr) => (
            <div
              key={pr.title}
              data-panel
              className="flex items-center md:h-[80vh]"
            >
              <a
                href={pr.link}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl"
              >
                <div
                  data-media
                  className="absolute inset-0 will-change-transform"
                  style={{
                    backgroundImage: `url(${pr.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2 text-sm font-semibold text-primary-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View project <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Variant 3 — Kinetic  (Awwwards oversized type + cursor-follow image) */
/* Giant project names. Hovering one lights it up and floats its image  */
/* under the cursor. Mobile: inline thumbnails, no follow.              */
/* ================================================================== */

function Kinetic() {
  const root = useRef<HTMLElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      const el = follower.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", onMove);

      gsap.from("[data-line]", {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-cream py-24 md:py-36"
      onMouseLeave={() => setHover(null)}
    >
      <div className="mb-14 px-6 md:mb-20 md:px-20">
        <span className="text-xs font-medium uppercase tracking-widest text-orange">
          Selected Work
        </span>
      </div>

      {/* Cursor-follow image — hidden on touch via pointer-events + opacity */}
      <div
        ref={follower}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ opacity: hover === null ? 0 : 1, transition: "opacity 300ms ease-out" }}
      >
        {hover !== null && (
          <div className="h-64 w-80 overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={projects[hover].image}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        )}
      </div>

      <div className="border-t border-primary-dark/12">
        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.link}
            data-line
            onMouseEnter={() => setHover(i)}
            className="group flex items-center justify-between gap-6 border-b border-primary-dark/12 px-6 py-8 md:px-20 md:py-10"
          >
            {/* Mobile thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl md:hidden">
              <img
                src={p.image}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className={`font-serif text-3xl leading-none transition-colors duration-300 md:text-7xl ${
                  hover === null
                    ? "text-primary-dark"
                    : hover === i
                      ? "text-orange"
                      : "text-primary-dark/25"
                }`}
              >
                {p.title}
              </h3>
              <span className="mt-2 hidden text-sm uppercase tracking-widest text-primary-dark/40 md:inline-block">
                {p.positioning}
              </span>
            </div>

            <span className="hidden font-serif text-lg text-primary-dark/30 md:block">
              0{i + 1}
            </span>
            <ArrowUpRight
              className={`h-6 w-6 shrink-0 transition-all duration-300 md:h-9 md:w-9 ${
                hover === i
                  ? "translate-x-0 translate-y-0 text-orange opacity-100"
                  : "-translate-x-2 translate-y-2 text-primary-dark/40 opacity-60 md:opacity-0"
              }`}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Picker harness — chrome, per PICKER.md. Do not restyle.             */
/* ------------------------------------------------------------------ */

const variants: { name: string; render: () => React.ReactNode }[] = [
  { name: "Cinematic", render: () => <Cinematic /> },
  { name: "Scrollytelling", render: () => <Scrollytelling /> },
  { name: "Kinetic", render: () => <Kinetic /> },
];

export default function PrototypePage() {
  const [current, setCurrent] = useState(0);
  const [mountKey, setMountKey] = useState(0);
  const [ready, setReady] = useState(false);

  const pickerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const moveHighlight = useCallback(() => {
    const el = itemRefs.current[current];
    const hl = highlightRef.current;
    if (!el || !hl) return;
    hl.style.width = `${el.offsetWidth}px`;
    hl.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [current]);

  useLayoutEffect(() => {
    moveHighlight();
  }, [moveHighlight]);

  useEffect(() => {
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  }, [moveHighlight]);

  useEffect(() => {
    const v = parseInt(
      new URLSearchParams(window.location.search).get("v") ?? "",
      10,
    );
    if (v >= 1 && v <= variants.length) setCurrent(v - 1);
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
  }, []);

  const select = useCallback((i: number) => {
    if (i < 0 || i >= variants.length) return;
    setCurrent(i);
    setMountKey((k) => k + 1);
    window.scrollTo(0, 0);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(i + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const replay = useCallback(() => {
    setMountKey((k) => k + 1);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= variants.length) select(num - 1);
      else if (e.key === "ArrowRight") select((current + 1) % variants.length);
      else if (e.key === "ArrowLeft")
        select((current - 1 + variants.length) % variants.length);
      else if (e.key === "r" || e.key === "R") replay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, select, replay]);

  return (
    <div className="min-h-screen bg-cream">
      <div key={mountKey}>{variants[current].render()}</div>

      <nav
        ref={pickerRef}
        className="proto-picker"
        aria-label="Prototype variants"
        data-ready={ready ? "" : undefined}
      >
        <span
          ref={highlightRef}
          className="proto-picker-highlight"
          aria-hidden="true"
        />
        {variants.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="proto-picker-item"
            data-active={i === current ? "" : undefined}
            aria-current={i === current ? "true" : undefined}
            onClick={() => select(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={replay}
        >
          ↻
        </button>
      </nav>

      <style>{`
        .proto-swap { animation: protoSwap 0.4s ease-out both; }
        @keyframes protoSwap {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .proto-swap { animation: none; }
        }

        .proto-picker {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2147483647;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px;
          border-radius: 999px;
          background: rgba(10, 10, 10, 0.82);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          backdrop-filter: blur(12px) saturate(1.4);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 8px 24px rgba(0, 0, 0, 0.24),
            0 2px 6px rgba(0, 0, 0, 0.12);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 13px;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          user-select: none;
          -webkit-user-select: none;
        }
        .proto-picker-highlight {
          position: absolute;
          top: 4px;
          left: 0;
          height: 28px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          will-change: transform;
        }
        .proto-picker[data-ready] .proto-picker-highlight {
          transition:
            transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
            width 250ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
        }
        .proto-picker-item {
          position: relative;
          display: flex;
          align-items: center;
          height: 28px;
          padding: 0 12px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font: inherit;
          cursor: pointer;
          transition: color 150ms ease-out;
        }
        .proto-picker-item:hover { color: rgba(255, 255, 255, 0.85); }
        .proto-picker-item:active { transform: scale(0.97); }
        .proto-picker-item:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.4);
          outline-offset: 2px;
        }
        .proto-picker-item[data-active] { color: #fff; }
        .proto-picker-divider {
          width: 1px;
          height: 16px;
          margin: 0 4px;
          background: rgba(255, 255, 255, 0.12);
        }
        .proto-picker-replay { padding: 0 10px; font-size: 14px; }
      `}</style>
    </div>
  );
}
