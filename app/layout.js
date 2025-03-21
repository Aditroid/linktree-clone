import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
// import { usePathname } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const pathname = usePathname();
// const showNavbar = ["/"].includes(window.location.pathname);

export const metadata = {
  title: "Link in bio tool: Everything you are, in one simple link",
  description: "Linktree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your Linktree – where it can be discovered with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* showNavbar && <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
