import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nezha Medical - Portail Santé',
  description: 'Plateforme Web pour un Cabinet de Médecine Générale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning évite le mismatch causé par des extensions navigateur
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Pas de ThemeProvider = pas de classe "dark" injectée côté client */}
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
