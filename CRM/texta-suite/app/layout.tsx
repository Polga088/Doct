import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TexTa Business Suite",
  description:
    "Neural-powered enterprise platform for next-generation business operations. Powered by the Synaptic Flow design system.",
  keywords: ["TexTa", "Business Suite", "ERP", "Neural", "Enterprise"],
  authors: [{ name: "TexTa Technology" }],
  openGraph: {
    title: "TexTa Business Suite",
    description: "Neural-powered enterprise platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Material Symbols Outlined — Variable Font */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
