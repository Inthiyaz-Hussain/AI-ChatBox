import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">AI Chat</h1>

          <h2 className="mt-6 text-2xl font-semibold">{title}</h2>

          <p className="mt-2 text-gray-500">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
