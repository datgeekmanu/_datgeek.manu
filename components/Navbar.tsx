import Link from "next/link";
import { BOOKING_URL } from "@/lib/contact";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: BOOKING_URL },
];

export default function Navbar() {
  return (
    <nav className="bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between p-10 h-[52px]">
        <Link
          href="/"
          className="flex items-center font-serif font-semibold text-primary-dark text-[20px] tracking-wider"
        >
          Datgeek.<span className="">manu</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-7 text-[20px] font-sans font-medium text-primary-dark">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={BOOKING_URL}
          className="rounded-full flex justify-center items-center bg-orange px-5 py-2.5 text-[16px] font-medium text-white hover:bg-orange/90 transition duration-150 active:scale-[0.97] motion-reduce:active:scale-100"
        >
          Work with me
        </Link>
      </div>
    </nav>
  );
}
