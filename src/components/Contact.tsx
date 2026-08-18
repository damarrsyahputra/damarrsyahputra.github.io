import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Container from "./Container";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import InstagramIcon from "./icons/InstagramIcon";
import MailIcon from "./icons/MailIcon";
import ParticleCloud from "./ParticleCloud";

const SOCIALS = [
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/damarrsyahptra/" },
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/damarrsyahputra" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/damarrsyahptra" },
  { label: "Gmail", icon: MailIcon, href: "mailto:damarrsyahptra16@gmail.com" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-16">
      <div className="flex items-center justify-center gap-4 pt-16 pb-12">
        <span className="w-10 h-px bg-line" />
        <span className="font-mono text-[16px] tracking-[0.3em] text-ink-soft uppercase">
          Contact
        </span>
        <span className="w-10 h-px bg-line" />
      </div>

      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-center select-none leading-[0.95] tracking-tight
                     text-[clamp(1.75rem,7.5vw,3.8rem)] md:text-[clamp(3rem,5.6vw,6.25rem)] mb-14"
        >
          <span className="text-outline-bg">Ready </span>
          <span className="text-ink">To Get Started?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Kiri: teks + sosmed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative z-0 flex flex-col gap-8"
          >
            {/* Background: awan partikel 3D, di belakang teks */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <ParticleCloud className="w-[75%] aspect-square" count={320} />
            </div>

            <p className="text-ink-soft text-base md:text-lg leading-relaxed">
              Have an idea, project, or collaboration in mind?
              <br />
              Send me a message and let's create something intelligent and impactful together.
              Currently open to new opportunities!
            </p>

            <div className="flex gap-3">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-full border border-line bg-surface/40
                             hover:bg-ink hover:text-bg transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Kanan: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative z-10 rounded-2xl border border-line bg-surface p-6 md:p-8"
          >
            <h3 className="font-display font-bold text-ink whitespace-nowrap
                            text-[clamp(1rem,3.2vw,1.4rem)] mb-6">
              You Know About Me, Let's Talk About You.
            </h3>

            <div className="w-full h-px bg-line mb-6" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-mono text-ink uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name or company..."
                  className="mt-2 w-full rounded-full border border-line bg-bg px-5 py-3 text-sm
                             text-ink placeholder:text-ink-soft/60 outline-none focus:border-ink transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-mono text-ink uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="mt-2 w-full rounded-full border border-line bg-bg px-5 py-3 text-sm
                             text-ink placeholder:text-ink-soft/60 outline-none focus:border-ink transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-mono text-ink uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="mt-2 w-full rounded-2xl border border-line bg-bg px-5 py-3 text-sm
                             text-ink placeholder:text-ink-soft/60 outline-none focus:border-ink transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-ink text-bg text-sm font-medium
                           px-6 py-3 rounded-full hover:opacity-85 transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="text-xs text-emerald-700 text-center">Pesan berhasil terkirim, terima kasih!</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600 text-center">Gagal mengirim, coba lagi ya.</p>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}