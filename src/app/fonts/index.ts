import localFont from "next/font/local";

export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
});

export const montaguSlab = localFont({
  src: "./montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf",
  variable: "--font-montagu-slab",
});
