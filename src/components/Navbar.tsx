import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Home", "About", "Showcase", "Contact"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl"
    >
      <nav
        className="flex items-center justify-between
                   rounded-full border border-white/25
                   bg-white/30 backdrop-blur-md backdrop-saturate-150
                   shadow-[0_4px_24px_rgba(33,31,27,0.1)]
                   px-5 py-2.5"
      >
        <div className="flex items-center gap-2 font-mono text-[11px] text-ink whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for work
        </div>

        {/* Nav links: desktop only */}
        <div
          className="hidden sm:flex items-center gap-1 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onMouseEnter={() => setHovered(link)}
              className="relative px-3 py-1.5 text-[13px] z-10"
            >
              {hovered === link && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 border border-line/25 bg-white/50 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative font-bold text-ink">
                {link}
              </span>
            </a>
          ))}
        </div>

        {/* Jam: desktop only */}
        <div className="hidden sm:block font-mono text-[11px] text-ink tabular-nums whitespace-nowrap">
          {formattedTime}
        </div>

        {/* Hamburger/X: mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className="sm:hidden relative w-6 h-6 flex items-center justify-center shrink-0"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute w-4 h-[1.5px] bg-ink rounded-full"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute w-4 h-[1.5px] bg-ink rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute w-4 h-[1.5px] bg-ink rounded-full"
          />
        </button>
      </nav>

      {/* Dropdown panel: mobile only, muncul saat menuOpen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="sm:hidden mt-2 rounded-2xl border border-white/25
                       bg-white/30 backdrop-blur-md backdrop-saturate-150
                       shadow-[0_4px_24px_rgba(33,31,27,0.1)]
                       px-5 py-4 flex flex-col items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-2 text-sm text-ink rounded-full hover:bg-white/50 transition-colors"
              >
                {link}
              </a>
            ))}
            <div className="w-full h-px bg-line/75 my-2" />
            <span className="font-mono text-[11px] text-ink tabular-nums">
              {formattedTime}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}