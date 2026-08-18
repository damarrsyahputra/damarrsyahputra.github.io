import Container from "./Container";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-line">
      <Container>
        <p className="text-center text-xs md:text-sm text-ink-soft font-mono tracking-wide">
          Copyright © 2026 All Rights Reserved | Created by{" "}
          <span className="text-ink font-semibold">Damar</span>
        </p>
      </Container>
    </footer>
  );
}