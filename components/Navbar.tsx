import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Process", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="bg-cream">
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
          href="mailto:holonouemmanuel0@gmail.com"
          className="rounded-full flex justify-center items-center bg-orange px-5 py-2.5 text-[16px] font-medium text-white hover:bg-orange/90 transition duration-150 active:scale-[0.97] motion-reduce:active:scale-100"
        >
          Work with me
        </Link>
      </div>
    </nav>
  );
}
