import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Container from "./Container";
import DotGrid from "./DotGrid";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <DotGrid />
      
      {/* Nama, di area atas, kasih ruang buat navbar floating */}
      <Container className="relative z-0 pt-32 md:pt-40">
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-display font-black text-center select-none leading-[0.95] tracking-tight
                    text-[clamp(1.75rem,7.5vw,3.8rem)] md:text-[clamp(3rem,5.6vw,6.25rem)]"
        >
          <span className="text-outline-bg">DAMAR </span>
          <br className="md:hidden" />
          <span className="text-ink">RIYADI SYAHPUTRA</span>
        </motion.h1>
      </Container>

      {/* Ghost text besar, di belakang foto */}
      <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-0 flex flex-col gap-1 md:gap-2" aria-hidden="true">
        <span className="font-display font-black text-ink/[0.07] uppercase whitespace-nowrap
                          select-none pointer-events-none leading-none
                          text-[clamp(1.75rem,6vw,4.5rem)]">
          Data Specialist
        </span>
        <span className="font-display font-black text-ink/[0.07] uppercase whitespace-nowrap
                          select-none pointer-events-none leading-none
                          text-[clamp(1.75rem,6vw,4.5rem)]">
          AI/ML Engineer
        </span>
      </div>

      {/* Label role, di atas foto */}
      <div className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-20 flex flex-col gap-2 md:gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-baseline gap-2 md:gap-4"
        >
          <span className="font-mono text-sm md:text-xl text-ink-soft">01 —</span>
          <span className="font-display font-bold text-ink uppercase tracking-tight
                            text-2xl md:text-5xl whitespace-nowrap">
            Data Specialist
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-baseline gap-2 md:gap-4"
        >
          <span className="font-mono text-sm md:text-xl text-ink-soft">02 —</span>
          <span className="font-display font-bold text-ink uppercase tracking-tight
                            text-2xl md:text-5xl whitespace-nowrap">
            AI/ML Engineer
          </span>
        </motion.div>
      </div>

      {/* Konten kanan: tagline + CTA + scroll indicator */}
      <div className="absolute right-6 md:right-12 bottom-4 md:bottom-6 z-20
                       flex flex-col items-end gap-6 md:gap-8 max-w-50 md:max-w-xs">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-end gap-4"
        >
          <p className="text-ink text-sm md:text-base leading-relaxed text-right">
            Turning data into clear, actionable
            <br/>
            insights, and intelligent solutions.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-ink text-bg text-sm font-medium
                       px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity whitespace-nowrap"
          >
            Let's collaborate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center gap-2"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink-soft uppercase whitespace-nowrap">
            Scroll Down
          </span>
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Foto: absolute, nempel bawah layar, tidak ikut alur flex */}
      <motion.img
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        src="/me-wb.png"
        alt="Damar Riyadi Syahputra"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10
             h-[42vh] sm:h-[55vh] md:h-[78vh] w-auto max-w-none
             rounded-t-2xl grayscale contrast-110 object-cover object-top"
      />
    </section>
  );
}