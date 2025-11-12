import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aeon Commerce AI Commander",
  description: "Autonomous digital operations agent for omnichannel commerce teams"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-slate-900 antialiased">{children}</body>
    </html>
  );
}
