import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jenas Anton",
  description: "Portfolio about Jenas Anton",
  appleWebApp: {
    capable: true,
    title: "Jenas Anton",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

// Proper scaling on phones/tablets; `viewportFit: "cover"` lets the page use
// the full screen on notched iPhones (padding comes from safe-area insets).
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#292929",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
