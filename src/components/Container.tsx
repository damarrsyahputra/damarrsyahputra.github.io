import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`px-6 md:px-16 max-w-350 mx-auto ${className}`}>
      {children}
    </div>
  );
}