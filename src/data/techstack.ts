export type TechItem = {
  name: string;
  slug: string; // slug Simple Icons, dipakai untuk ambil logo dari CDN
};

export const TECH_STACK: TechItem[] = [
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python", slug: "python" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "React", slug: "react" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Vercel", slug: "vercel" },
  { name: "Supabase", slug: "supabase" },
  { name: "Claude", slug: "claude" },
  { name: "Gemini", slug: "googlegemini" },
];