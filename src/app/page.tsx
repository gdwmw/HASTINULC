import { Metadata, Viewport } from "next";
import { FC, ReactElement } from "react";

import HomeLayout from "@/src/layouts/home";

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
};

export const metadata: Metadata = {
  description: "Hastinulc Makeup Art - Professional Makeup Services in Padang - Get the perfect look for your special day at an affordable price",
  keywords: [
    "Hastinulc Makeup Art",
    "Hastinulc Makeup",
    "Hastinulc",
    "Professional Makeup Services in Padang",
    "Professional Makeup Services",
    "Professional Makeup",
  ],
  openGraph: {
    description: "Hastinulc Makeup Art - Professional Makeup Services in Padang - Get the perfect look for your special day at an affordable price",
    images: [
      {
        alt: "Hastinulc Makeup Art",
        height: 800,
        url: "https://hastinulc-makeup-art.vercel.app/assets/images/logos/Hastinulc.png", // Must be an absolute URL and PNG format
        width: 800,
      },
    ],
    locale: "en_US",
    siteName: "Hastinulc Makeup Art",
    title: "Hastinulc | Home",
    type: "website",
    url: "https://hastinulc-makeup-art.vercel.app/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      noimageindex: false,
    },
    index: true,
    nocache: false,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hastinulchotimah",
    description: "Hastinulc Makeup Art - Professional Makeup Services in Padang - Get the perfect look for your special day at an affordable price",
    images: ["https://hastinulc-makeup-art.vercel.app/assets/images/logos/Hastinulc.png"], // Must be an absolute URL and PNG format
    title: "Hastinulc | Home",
  },
};

const HomePage: FC = (): ReactElement => <HomeLayout />;

export default HomePage;
