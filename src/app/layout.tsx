import type { Metadata, Viewport } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";

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
  metadataBase: new URL("https://possize.com"),
  title: {
    default: "PosSize — Free Trading Calculators",
    template: "%s",
  },
  description:
    "Free trading tools for traders. Position size calculator, risk/reward calculator, compound interest calculator and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "PosSize",
    url: "https://possize.com",
    title: "PosSize — Free Trading Calculators",
    description:
      "Free, no-signup trading calculators: position size, risk/reward, compound interest, profit/loss, pip and margin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PosSize — Free Trading Calculators",
    description:
      "Free, no-signup trading calculators for serious traders.",
  },
  applicationName: "PosSize",
  appleWebApp: {
    capable: true,
    title: "PosSize",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
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

// Inject the Cloudflare Web Analytics beacon as a real <script> element so the
// beacon reads its own data-cf-beacon token via document.currentScript. (Using
// next/script serialised it into the RSC stream, where the token was never
// applied — so analytics received no data.)
const cfBeaconScript = `(function(){try{var s=document.createElement('script');s.defer=true;s.src='https://static.cloudflareinsights.com/beacon.min.js';s.setAttribute('data-cf-beacon','{"token":"3ca027ed5db94f52af8003f6b7c1541a"}');(document.head||document.documentElement).appendChild(s);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Speed up the third-party ad/analytics handshakes */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* AdSense loader — real async tag so the crawler/script picks up the publisher id */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6037343600471239"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: cfBeaconScript }} />
      </head>
      <body className={`${spaceMono.variable} ${dmSans.variable}`}>
        {children}
        <Footer />
        <CommandPalette />
        <ThemeToggle />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
