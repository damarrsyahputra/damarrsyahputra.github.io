import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      id="about"
      className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-16"
    >

      <div className="flex items-center justify-center gap-4 pt-16 pb-12">
        <span className="w-10 h-px bg-line" />
        <span className="font-mono text-[16px] tracking-[0.3em] text-ink-soft uppercase">
          About
        </span>
        <span className="w-10 h-px bg-line" />
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-start">
            {/* Kolom 1: Judul */}
            <h2 className="font-display font-black leading-[0.95] tracking-tight
                text-[clamp(1.75rem,7.5vw,3.8rem)] md:text-[clamp(3rem,5.6vw,6.25rem)]">
            <span className="text-outline-bg">Who </span>
            <span className="text-ink">Am I</span>
            </h2>

            {/* Kolom 2: Foto, 2 kotak bertumpuk */}
            <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-3/4 md:w-64 md:h-80 md:aspect-auto"
            >
              {/* Kotak belakang: solid polos */}
              <div className="absolute inset-0 rounded-2xl bg-ink-soft translate-x-3 translate-y-3" />

              {/* Kotak depan: foto, sedikit miring */}
              <img
                src="/foto_profil_bg2.jpeg"
                alt="Damar Riyadi Syahputra"
                className="relative w-full h-full object-cover rounded-2xl 
                           -rotate-3 shadow-xl shadow-ink/80"
              />
            </motion.div>

            {/* Kolom 3: Paragraf + tombol */}
            <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 text-sm md:text-base text-ink-soft"
            >
            <p className="text-justify">
                Hello, I'm Damar Riyadi Syahputra, a passionate Informatics Engineering graduate 
                based in Semarang, Indonesia. With a strong interest in technology and data, 
                I strive to build smart solutions that solve everyday problems. Over the years, 
                I have had the opportunity to work on diverse projects, ranging from developing 
                user-friendly websites to creating intelligent applications. As my final college 
                project, I developed an AI-powered detection system utilizing a ResNet50 Convolutional 
                Neural Network to identify dangerous objects in airport X-ray imagery.
            </p>
            <p className="text-justify">
                These experiences, along with my leadership roles in student organizations,
                have taught me that great technology is about more than just complex code.
                It is about teamwork, clear communication, and creating tools that truly
                bring value to people's lives. I am always eager to learn, adapt to new
                environments, and take on fresh challenges to grow both personally and
                professionally.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
                <a
                href="/CV%20Damar.pdf"
                download
                className="inline-flex items-center gap-2 bg-ink text-bg text-sm font-medium
                            px-5 py-2.5 rounded-full w-fit hover:bg-accent hover:text-bg
                            transition-colors"
                >
                <Download size={16} />
                CV/Resume
                </a>
            </div>
            </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}