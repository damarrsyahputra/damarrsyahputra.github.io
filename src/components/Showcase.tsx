import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import GithubIcon from "./icons/GithubIcon";
import Container from "./Container";
import Lightbox from "./Lightbox";
import { PROJECTS, type Project } from "../data/projects";
import { CERTIFICATES, type Certificate } from "../data/certificates";
import { TECH_STACK } from "../data/techstack";

const TABS = ["Projects", "Certificates", "Tech Stack"] as const;
type Tab = (typeof TABS)[number];

const EASE = [0.22, 1, 0.36, 1] as const;
const VISIBLE_COUNT = 3;

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 0px 0px rgba(33,31,27,0)" },
  hover: {
    y: -6,
    boxShadow: "0 12px 28px rgba(33,31,27,0.12)",
    transition: { duration: 0.25, ease: EASE },
  },
};

function ShowMoreButton({ expanded, onClick }: { expanded: boolean; onClick: () => void }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 text-ink-soft hover:text-ink transition-colors"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase">
          {expanded ? "Show less" : "Show more"}
        </span>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          width="70" height="10" viewBox="0 0 70 10" fill="none"
        >
          <path d="M2 2 L35 8 L68 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
    </div>
  );
}

function UpcomingCard({ variant = "project" }: { variant?: "project" | "certificate" }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className="rounded-2xl border border-line overflow-hidden bg-surface/40"
    >
      <div className="aspect-video w-full bg-surface flex items-center justify-center">
        <span className="font-mono text-xs tracking-[0.25em] text-ink-soft uppercase">
          Upcoming
        </span>
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <p className="font-bold text-ink text-base">Upcoming</p>
        {variant === "project" && (
          <button
            type="button"
            disabled
            aria-disabled="true"
            tabIndex={-1}
            className="p-2 rounded-full border border-line text-ink-soft/50 cursor-not-allowed shrink-0"
          >
            <GithubIcon size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className="group min-w-0 rounded-2xl border border-line overflow-hidden bg-surface/40"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video w-full overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </a>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-w-0"
        >
          <p className="font-bold text-ink text-base truncate">
            <span className="bg-bottom-left bg-linear-to-r from-ink to-ink bg-size-[0%_1px] bg-no-repeat
                             group-hover:bg-size-[100%_1px] transition-[background-size] duration-300 ease-out
                             pb-0.5">
              {project.title}
            </span>
          </p>
          <p className="font-mono text-xs text-ink-soft mt-1 truncate">{project.platform}</p>
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lihat repositori ${project.title}`}
          className="p-2 rounded-full border border-ink-soft/50 hover:bg-ink hover:text-bg transition-colors shrink-0"
        >
          <GithubIcon size={16} />
        </a>
      </div>
    </motion.div>
  );
}

function CertificateCard({ certificate, onClick }: { certificate: Certificate; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className="text-left min-w-0 rounded-2xl border border-line overflow-hidden bg-surface/40 group w-full"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={certificate.image}
          alt={certificate.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-5 py-4">
        <p className="font-bold text-ink text-base truncate">{certificate.title}</p>
        <p className="font-mono text-xs text-ink-soft mt-1 truncate">{certificate.platform}</p>
      </div>
    </motion.button>
  );
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [certsExpanded, setCertsExpanded] = useState(false);

  const visibleProjects = projectsExpanded ? PROJECTS : PROJECTS.slice(0, VISIBLE_COUNT);
  const visibleCertificates = certsExpanded ? CERTIFICATES : CERTIFICATES.slice(0, VISIBLE_COUNT);

  return (
    <section id="showcase" className="pt-6 pb-16 md:pt-10 md:pb-16">
      <div className="flex items-center justify-center gap-4 pt-16 pb-12">
        <span className="w-10 h-px bg-line" />
        <span className="font-mono text-[16px] tracking-[0.3em] text-ink-soft uppercase">
          Showcase
        </span>
        <span className="w-10 h-px bg-line" />
      </div>

      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-center select-none leading-[0.95] tracking-tight
                      text-[clamp(1.75rem,7.5vw,3.8rem)] md:text-[clamp(3rem,5.6vw,6.25rem)] mb-10"
        >
          <span className="text-outline-bg">Portfolio </span>
          <span className="text-ink">Showcase</span>
        </motion.h2>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-surface border border-line">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-4 md:px-5 py-2 text-sm font-medium rounded-full z-10"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="showcase-tab"
                    className="absolute inset-0 bg-ink rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span style={{ color: activeTab === tab ? "var(--color-bg)" : "var(--color-ink)" }}>
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Konten tab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Projects" && (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {visibleProjects.map((p) => (
                        <motion.div
                          key={p.title}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="min-w-0"
                        >
                          <ProjectCard project={p} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {Array.from({ length: Math.max(0, VISIBLE_COUNT - PROJECTS.length) }).map((_, i) => (
                      <UpcomingCard key={`upcoming-project-${i}`} variant="project" />
                    ))}
                  </div>
                  {PROJECTS.length > VISIBLE_COUNT && (
                    <ShowMoreButton
                      expanded={projectsExpanded}
                      onClick={() => setProjectsExpanded((v) => !v)}
                    />
                  )}
                </>
              )}

              {activeTab === "Certificates" && (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {visibleCertificates.map((c) => (
                        <motion.div
                          key={c.title}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="min-w-0"
                        >
                          <CertificateCard certificate={c} onClick={() => setLightboxCert(c)} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {Array.from({ length: Math.max(0, VISIBLE_COUNT - CERTIFICATES.length) }).map((_, i) => (
                      <UpcomingCard key={`upcoming-cert-${i}`} variant="certificate" />
                    ))}
                  </div>
                  {CERTIFICATES.length > VISIBLE_COUNT && (
                    <ShowMoreButton
                      expanded={certsExpanded}
                      onClick={() => setCertsExpanded((v) => !v)}
                    />
                  )}
                </>
              )}

              {activeTab === "Tech Stack" && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-5">
                  {TECH_STACK.map((tech) => (
                    <motion.div
                      key={tech.name}
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="flex flex-col items-center gap-2.5 rounded-2xl border border-line
                                bg-surface/40 px-3 py-5"
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${tech.slug}`}
                        alt={tech.name}
                        loading="lazy"
                        decoding="async"
                        className="w-8 h-8 md:w-9 md:h-9 object-contain"
                      />
                      <span className="font-mono text-[10px] md:text-xs text-ink-soft font-bold uppercase tracking-wide text-center">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>

      <Lightbox certificate={lightboxCert} onClose={() => setLightboxCert(null)} />
    </section>
  );
}