import "./globals.css";
import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LivEstates – Live Real Estate Showings",
  description:
    "LivEstates brings live property tours, verified agents, and saved showing replays into one real estate platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="gradient">
        {/* Fixed broadcast atmosphere: drifting aurora + grid + grain. */}
        <div aria-hidden className="fx-aurora">
          <span className="fx-blob fx-blob-a" />
          <span className="fx-blob fx-blob-b" />
          <span className="fx-blob fx-blob-c" />
        </div>
        <div aria-hidden className="fx-grid" />
        <div aria-hidden className="fx-grain" />
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
