import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
};

type Props = {
  className?: string;
  count?: number;
  color?: string;
  rotationSpeedY?: number;
  rotationSpeedX?: number;
  minSpread?: number; // seberapa rapat saat section penuh di layar
  maxSpread?: number; // seberapa menyebar saat section baru muncul
};

export default function ParticleCloud({
  className = "",
  count = 200,
  color = "87, 83, 74",
  rotationSpeedY = 0.0025,
  rotationSpeedX = 0.0012,
  minSpread = 0.35,
  maxSpread = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let angleY = 0;
    let angleX = 0;
    let currentSpread = maxSpread;

    const particles: Particle[] = Array.from({ length: count }).map(() => {
      const u = Math.random();
      const r = Math.cbrt(u);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Hitung target sebaran berdasarkan posisi elemen relatif ke viewport.
    // Section baru muncul di bawah layar -> menyebar penuh (maxSpread).
    // Section sudah "penuh"/melewati tengah layar -> mengumpul (minSpread).
    const getTargetSpread = () => {
      const container = canvas.parentElement?.parentElement; // wrapper -z-10 -> kolom kiri
      if (!container) return maxSpread;
      const rect = container.getBoundingClientRect();
      const progress = 1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1);
      return maxSpread - (maxSpread - minSpread) * progress;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) / 2;
      const cx = width / 2;
      const cy = height / 2;
      const perspective = radius * 2.2;

      angleY += rotationSpeedY;
      angleX += rotationSpeedX;

      // smooth transition ke target spread, biar tidak "patah"
      const target = getTargetSpread();
      currentSpread += (target - currentSpread) * 0.04;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = particles.map((p) => {
        const px = p.x * currentSpread;
        const py = p.y * currentSpread;
        const pz = p.z * currentSpread;

        let x = px * cosY - pz * sinY;
        let z = px * sinY + pz * cosY;
        let y = py;

        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        const scale = perspective / (perspective - z * radius);
        return {
          sx: cx + x * radius * scale,
          sy: cy + y * radius * scale,
          z,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const pt of projected) {
        const depthFactor = (pt.z + 1) / 2;
        const size = 0.6 + depthFactor * 1.8;
        const opacity = 0.15 + depthFactor * 0.55;

        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [count, color, rotationSpeedY, rotationSpeedX, minSpread, maxSpread]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}