import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Business IT Solutions In Bangalore | Software & Marketing Solutions",
  description:
    "PQube covers maximum space in offering Business IT Solutions in India. It helps your business to find quick and quality growth in various sectors.",
  keywords:
    "software solutions, IT solutions, Business IT Solutions in India, IT Solution Providers in Bangalore, Business solutions services in Bangalore, IT Service Providers, IT Solutions for businesses",
  openGraph: {
    title: "Business IT Solutions In Bangalore | Software & Marketing Solutions",
    description:
      "PQube covers maximum space in offering Business IT Solutions in India. It helps your business to find quick and quality growth in various sectors.",
    type: "website",
    locale: "en_GB",
    siteName: "PQube Business Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business IT Solutions In Bangalore | Software & Marketing Solutions",
    description:
      "PQube covers maximum space in offering Business IT Solutions in India. It helps your business to find quick and quality growth in various sectors.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
