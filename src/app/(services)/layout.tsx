import type { Metadata } from "next";
import { Gate, Sidebar } from '@/components';

import "@/app/globals.css";
import "./logged.css";

export const metadata: Metadata = {
  title: "Ordine",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Gate>
          <Sidebar />
          {children}
        </Gate>
      </body>
    </html>
  );
}
