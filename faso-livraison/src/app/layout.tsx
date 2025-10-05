import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faso livraison",
  description:
    "Plateforme de livraison et transport au Burkina Faso: Ouagadougou et toutes les provinces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-emerald-700">Faso livraison</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/register" className="hover:underline">Inscription</Link>
              <Link href="/couriers" className="hover:underline">Livreurs</Link>
              <Link href="/companies" className="hover:underline">Sociétés de transport</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="w-full border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} Faso livraison
          </div>
        </footer>
      </body>
    </html>
  );
}
