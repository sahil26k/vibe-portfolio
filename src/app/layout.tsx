import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { AnimatedGrid } from "@/components/portfolio/AnimatedGrid";
import { CursorTracker3D } from "@/components/portfolio/CursorTracker3D";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sahil Kashyap | Full Stack Developer",
  description: "Portfolio of Sahil Kashyap, a performance-driven Full Stack Developer specializing in MERN stack and .NET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
        <CustomCursor />
        <AnimatedGrid />
        <CursorTracker3D position="fixed" />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="f449fb80-024e-4f66-b37a-f11af0fd88a3"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
