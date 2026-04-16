import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Real-time cryptocurrency tracking and conversion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="sunset">
      <head>
        {/* Apply saved theme before render to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme") || "sunset";
                document.documentElement.setAttribute("data-theme", theme);
              } catch {}
            `,
          }}
        />
      </head>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
