import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { EXPERIENCES} from "../data/experiences";

const EASE = [0.22, 1, 0.36, 1] as const;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </motion.svg>
  );
}

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="experience" className="pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="flex items-center justify-center gap-4 pt-16 pb-12">
        <span className="w-10 h-px bg-line" />
        <span className="font-mono text-[16px] tracking-[0.3em] text-ink-soft uppercase">
          Experience
        </span>
        <span className="w-10 h-px bg-line" />
      </div>

      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-center leading-[0.95] tracking-tight
                     text-[clamp(1.75rem,7.5vw,3.8rem)] md:text-[clamp(3rem,5.6vw,6.25rem)] mb-12"
        >
          <span className="text-outline-bg">Professional </span>
          <span className="text-ink">Experiences</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1.75 top-3 bottom-3 w-px bg-line" aria-hidden="true" />

          <div className="flex flex-col gap-4">
            {EXPERIENCES.map((exp, index) => {
              const isOpen = openId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative pl-8"
                >
                  <span
                    className={`absolute left-0 top-6 w-3.75 h-3.75 rounded-full border-2 transition-colors
                                ${isOpen ? "bg-ink-soft border-ink-soft" : "bg-bg border-line"}`}
                    aria-hidden="true"
                  />

                  <div className="rounded-2xl border border-line bg-surface/40 overflow-hidden">
                    <button
                      onClick={() => setOpenId(isOpen ? null : exp.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-4 px-5 md:px-6 pt-4 pb-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-bold text-ink text-base md:text-lg">{exp.title}</p>
                        </div>
                        <span className="text-ink-soft shrink-0 mt-1">
                          <ChevronIcon open={isOpen} />
                        </span>
                      </div>

                      <div className="px-5 md:px-6 pb-5 flex flex-col">
                        {exp.positions.map((pos, posIndex) => {
                          const isLast = posIndex === exp.positions.length - 1;
                          const hasMultiple = exp.positions.length > 1;

                          return (
                            <div
                              key={pos.role}
                              className={`relative pl-4 ${posIndex > 0 ? "mt-3" : ""}`}
                            >
                              <span className="absolute left-0 top-[0.45em] w-1.75 h-1.75 rounded-full bg-ink-soft" />
                              {hasMultiple && !isLast && (
                                <span className="absolute left-0.75 top-[1.1em] -bottom-3 w-px bg-ink-soft" />
                              )}

                              <p className="font-mono text-xs md:text-sm text-ink-soft">
                                {pos.role} ({pos.period})
                              </p>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className="overflow-hidden"
                                  >
                                    <ul className="flex flex-col gap-1.5 mt-2.5 pl-3">
                                      {pos.description.map((line, i) => (
                                        <li
                                          key={i}
                                          className="text-ink-soft text-sm leading-relaxed pl-4 relative"
                                        >
                                          <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-ink-soft" />
                                          {line}
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}