import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ClientRootLayout } from "@/components/layout/client-root-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Gerenciador de Usuários",
  description: "Sistema de gerenciamento de usuários",
};

export default function RootLayoutApp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${notoSerif.variable} ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
