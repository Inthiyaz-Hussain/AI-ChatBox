import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
