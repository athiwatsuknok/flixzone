import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlixZone - Explore Popular & Trending Movies",
  description:
    "FlixZone is your ultimate movie discovery platform. Browse trending films by genre, watch trailers, and find your next favorite movie — all in one place.",
  keywords: [
    "movies",
    "FlixZone",
    "movie trailers",
    "popular movies",
    "movie genres",
    "action movies",
    "romance",
    "comedy",
    "film discovery",
    "nextjs movie app",
  ],
  openGraph: {
    title: "FlixZone - Explore Popular & Trending Movies",
    description:
      "Browse movies by genre, watch trailers, and discover top-rated films on FlixZone.",
    type: "website",
    url: "https://yourdomain.com",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlixZone Movie Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlixZone",
    description: "Discover and explore movies by genre with trailers and more.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
