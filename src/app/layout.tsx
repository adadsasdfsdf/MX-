import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatSoporte from "@/components/ChatSoporte";
import Nieve from "@/components/Nieve";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Navidalia · La magia de la Navidad, a tu puerta",
    template: "%s · Navidalia",
  },
  description:
    "Navidalia: tienda de artículos navideños en México. Árboles, esferas, luces, decoración, regalos, ropa y dulces. Envíos a toda la República.",
  keywords: [
    "Navidad",
    "árbol de navidad",
    "decoración navideña",
    "esferas",
    "luces",
    "regalos",
    "México",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={inter.variable}>
      <GoogleAnalytics />
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <AuthProvider>
          <CarritoProvider>
            <Nieve cantidad={20} />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatSoporte />
          </CarritoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
