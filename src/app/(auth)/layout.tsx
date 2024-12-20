import type { Metadata } from "next";
import Gate from "@/components/auth/gate";
import { Onest } from "next/font/google";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Ordine",
  description:
    "Ordine é um gerenciador de comandas desenvolvido pelo Brasilis Club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={onest.variable}>
      <body>
        <Gate>{children}</Gate>
        <Toaster />
      </body>
    </html>
  );
}
