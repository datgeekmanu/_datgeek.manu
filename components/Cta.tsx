import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      data-purpose="cta-section"
    >
      <div className="bg-primary-dark rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white font-serif mb-6 tracking-tight">
            Ready to bring your project{" "}
            <span className="text-orange">to life?</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
            Let's discuss your requirements and build something great together.
            Book a free consultation today.
          </p>
          <Link
            className="inline-flex items-center px-8 py-4 bg-orange text-white font-bold rounded-xl shadow-[0_10px_25px_rgba(232,100,26,0.3)] hover:bg-brand-accent/90 transition-all duration-300 transform hover:-translate-y-1 group"
            href="mailto:holonouemmanuel0@gmail.com?subject=Free%20consultation"
          >
            <CalendarDays className="mr-2" />
            Book a Free Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
