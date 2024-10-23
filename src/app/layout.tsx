import type { Metadata } from "next";
import "./globals.css";

import Padoru from "@/public/gifs/padoru.gif";

import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "University Schedules",
  description: "Aplicación para crear horarios para estudiantes",
  icons: { icon: Padoru.src },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
