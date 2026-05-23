import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "damian",
  description: "damian home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: '"Clash Display", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
