export type Certificate = {
  title: string;
  platform: string;
  image: string; // thumbnail untuk card (selalu gambar, walau sertifikat aslinya PDF)
  fileType: "image" | "pdf";
  fileUrl: string; // file yang dibuka di lightbox (gambar full-size atau PDF)
};

export const CERTIFICATES: Certificate[] = [
  {
    title: "Bangkit Academy 2024",
    platform: "Bangkit Academy",
    image: "/certificate/preview/Bangkit%20Academy%202024%20preview.jpg",
    fileType: "pdf",
    fileUrl: "/certificate/Bangkit%20Academy%202024.pdf",
  },
  {
    title: "Machine Learning Specialization",
    platform: "Coursera",
    image: "/certificate/preview/Machine%20Learning%20Specialization%20preview.jpg",
    fileType: "pdf",
    fileUrl: "/certificate/Machine%20Learning%20Specialization.pdf",
  },
  {
    title: "Deep Learning Specialization",
    platform: "Coursera",
    image: "/certificate/preview/DeepLearning%20Specialization%20preview.jpg",
    fileType: "image",
    fileUrl: "/certificate/DeepLearning%20Specialization.jpeg",
  },
  {
    title: "Seminar Nasional \"Shaping the Future of Digital Illustration in the AI Era: Creativity, Copyright and Ethics\"",
    platform: "HM-TIF UNISSULA",
    image: "/certificate/preview/Seminar_Nasional_HM_TIF_UNISSULA.jpg",
    fileType: "pdf",
    fileUrl: "/certificate/Seminar_Nasional_HM_TIF_2025.pdf",
  },
];