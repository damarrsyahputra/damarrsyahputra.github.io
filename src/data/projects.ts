export type Project = {
  title: string;
  platform: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Monitor Harga Pangan",
    platform: "React + Supabase",
    image: "/projects/monitor_harga_pangan.png",
    githubUrl: "https://github.com/damarrsyahputra/monitor-harga-bahan-pokok",
    liveUrl: "https://monitor-harga-bahan-pokok.vercel.app/",
  },
  {
    title: "Coffeshop Sales Report",
    platform: "Streamlit",
    image: "/projects/coffee_shop_dashboard.png",
    githubUrl: "https://github.com/damarrsyahputra/coffee-shop-sales-dashboard",
    liveUrl: "https://coffee-shop-sales-dashboard-damar.streamlit.app/",
  },
  {
    title: "Airport Threat Detection",
    platform: "Computer Vision + Streamlit",
    image: "/projects/airport_threat_detection.png",
    githubUrl: "https://github.com/damarrsyahputra/airport-threat-detection",
    liveUrl: "https://airport-threat-detection.streamlit.app/",
  },
];