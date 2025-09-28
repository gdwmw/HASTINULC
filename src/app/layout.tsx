import type { Metadata } from "next";

import { FC, PropsWithChildren, ReactElement } from "react";

import { APIConnectionChecker } from "@/src/components";
import { NextAuthProvider, NextThemesProvider, ReactQueryProvider } from "@/src/libs";

import { geistMono, geistSans, montaguSlab } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  authors: [{ name: "Hastinulc Makeup Art", url: "https://github.com/hastinulchotimah" }],
  category: "Boilerplate",
  creator: "Hastinulc Makeup Art",
  publisher: "Hastinulc Makeup Art",
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "Hastinulc | Home",
    template: "Hastinulc | %s",
  },
};

type T = Readonly<PropsWithChildren>;

const RootLayout: FC<T> = (props): ReactElement => (
  <html className="scroll-smooth" lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} ${montaguSlab.variable} antialiased`}>
      <NextThemesProvider>
        <ReactQueryProvider>
          <NextAuthProvider>
            {props.children}
            <APIConnectionChecker />
          </NextAuthProvider>
        </ReactQueryProvider>
      </NextThemesProvider>
    </body>
  </html>
);

export default RootLayout;
