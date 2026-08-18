export type ExperiencePosition = {
  role: string;
  period: string;
  description: string[];
};

export type ExperienceItem = {
  id: string;
  title: string;
  positions: ExperiencePosition[];
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "diskominfo",
    title: "Diskominfo Kota Semarang",
    positions: [
      {
        role: "IT Internship",
        period: "May 2025 – Jun 2025",
        description: [
          "Conducted data collection and operational status audits for Elementary School websites in Semarang.",
          "Rebranded the school website interface (UI/UX) to be more modern and informative. ",
          "Rebuilt the Elementary School website system end-to-end using the Laravel framework.",
        ],
      },
    ],
  },
  {
    id: "bangkit",
    title: "Machine Learning Cohort Bangkit Academy 2024",
    positions: [
      {
        role: "Independent Study Program",
        period: "Sep 2024 – Dec 2024",
        description: [
          "Developed and trained Machine Learning and Deep Learning models using Python and the TensorFlow ecosystem..",
          "Conducted data analysis using Python and deployed Machine Learning models into web-based platforms.",
          "Capstone Project: Collaborated with the mobile development and cloud computing teams to develop CashBox, a Machine Learning-based application that provides financial recommendations to users.",
        ],
      },
    ],
  },
  {
    id: "student-senate",
    title: "Student Senate Of The Faculty Of Industrial Technology, UNISSULA",
    positions: [
      {
        role: "Chairman of Commission 1 Legislation",
        period: "Jan 2025 - Dec 2025",
        description: [
          "Took full responsibility for all members and functions of Commission 1 on Legislation. ",
          "Responsible for the initiation, drafting, and finalization processes of new regulations or draft laws.",
          "Coordinated the delegation of tasks to all members to ensure legislative functions ran effectively and efficiently.",
          "Led, directed, and managed all working meetings and agendas of Commission 1.",
        ],
      },
      {
        role: "Member of Commission 1 Legislation",
        period: "Mar 2024 - Jan 2025",
        description: [
          "Actively participated in providing ideas and perspectives.",
          "Conducted research, study, and evaluation of laws and regulations",
          "Chaired the Grand Deliberation Assembly of the Student Organizations of the Faculty of Industrial Technology.",
        ],
      },
    ],
  },
];