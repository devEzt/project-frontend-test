import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientRootLayout } from "@/components/layout/client-root-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
