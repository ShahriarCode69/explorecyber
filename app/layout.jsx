import { Funnel_Display } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";
import LenisProvider from "./components/LenisProvider";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/footer";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://explorecyber.com";
const defaultTitle = "Explore Cyber | Elite Cybersecurity Services";
const defaultDescription =
  "Modern cybersecurity consulting that tests, defends, and hardens your digital infrastructure with continuous protection and expert guidance.";
const developerName =
  process.env.NEXT_PUBLIC_DEV_NAME || "Shahriar";
const developerUrl =
  process.env.NEXT_PUBLIC_DEV_URL || "https://shahriarcode.vercel.app/";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Explore Cyber",
  },
  description: defaultDescription,
  applicationName: "Explore Cyber",
  keywords: [
    "Penetration Testing Services",
    "Web Application Penetration Testing",
    "Vulnerability Assessment Service",
    "Cybersecurity Company",
    "Cybersecurity Services for Businesses",
    "Managed Security Services",
    "Explore Cyber",
    "Website Security Audit",
    "Explore Cyber home page",
    "Explore Cyber Website",
    "E-commerce Cybersecurity Services",
    "SaaS Security Testing",
    "Cloud Security Audit",
    "Network Security Assessment",
    "SOC Monitoring Service",
    "24/7 Cybersecurity Monitoring",
    "API Penetration Testing",
    "Digital Forensics Service",
    "Incident Response Service",
    "Cybersecurity Consulting Firm",
    "Cybersecurity company in Bangladesh",
    "Penetration testing service in Bangladesh",
    "Website security in Dhaka",
    "Cybersecurity for Bangladeshi businesses",
    "IT security company Bangladesh",
    "Remote penetration testing company",
    "Global cybersecurity services",
    "Offshore cybersecurity team",
    "Cybersecurity outsourcing",
    "ExploreCyber penetration testing",
    "ExploreCyber cybersecurity services",
    "ExploreCyber security audit",
    "ExploreCyber SOC monitoring",
    "ExploreCyber cloud security",
  ],
  authors: [
    { name: "Explore Cyber Team", url: siteUrl },
    { name: developerName, url: developerUrl },
  ],
  creator: developerName,
  publisher: "Explore Cyber",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Explore Cyber",
    images: [
      {
        url: "/backgrounds/heroBg.png",
        width: 1200,
        height: 630,
        alt: "Explore Cyber hero background",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/backgrounds/heroBg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  themeColor: "#f8333c",
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${funnelDisplay.variable} antialiased`}>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer/>
        </LenisProvider>
      </body>
    </html>
  );
}
