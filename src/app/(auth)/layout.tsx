import type { Metadata } from "next";
import Gate from "@/components/auth/gate";

import "@/app/globals.css";

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
    <html lang="pt-BR">
      <body>
        <Gate>{children}</Gate>
      </body>
    </html>
  );
}
