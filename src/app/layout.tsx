import type { Metadata, Viewport } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PosSize — Free Trading Calculators",
  description:
    "Free trading tools for traders. Position size calculator, risk/reward calculator, compound interest calculator and more.",
  applicationName: "PosSize",
  appleWebApp: {
    capable: true,
    title: "PosSize",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  other: {
    "google-adsense-account": "ca-pub-6037343600471239",
  },
};

export const viewport: Viewport = {
  themeColor: "#090e14",
};

// Runs before paint to apply the saved theme and avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${spaceMono.variable} ${dmSans.variable}`}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6037343600471239"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "3ca027ed5db94f52af8003f6b7c1541a"}'
          strategy="afterInteractive"
        />
        {children}
        <ThemeToggle />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
