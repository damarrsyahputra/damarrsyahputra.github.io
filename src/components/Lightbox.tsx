import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Certificate } from "../data/certificates";

type Props = {
  certificate: Certificate | null;
  onClose: () => void;
};

export default function Lightbox({ certificate, onClose }: Props) {
  useEffect(() => {
    if (!certificate) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-bg rounded-2xl overflow-hidden w-full max-w-4xl max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-line flex-shrink-0">
              <div>
                <p className="font-bold text-ink text-sm">{certificate.title}</p>
                <p className="font-mono text-xs text-ink-soft mt-0.5">{certificate.platform}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup"
                className="p-2 rounded-full hover:bg-surface transition-colors flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-surface">
              {certificate.fileType === "image" ? (
                <img
                  src={certificate.fileUrl}
                  alt={certificate.title}
                  className="w-full h-auto"
                />
              ) : (
                <iframe
                  src={certificate.fileUrl}
                  title={certificate.title}
                  className="w-full h-[75vh] border-0"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}