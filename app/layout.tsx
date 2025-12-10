import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FSAE Telemetry",
  description: "Real-time Telemetry Dashboard for Formula Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
