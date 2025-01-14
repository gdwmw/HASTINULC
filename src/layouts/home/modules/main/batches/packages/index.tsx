"use client";

import { Session } from "next-auth";
import localFont from "next/font/local";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaChevronRight } from "react-icons/fa";

import { ExampleATWM } from "@/src/components/interfaces/example/A";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

const PACKAGES_DATA = [
  {
    description: [
      { id: 1, text: "Three-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 1,
    price: "Rp 3,500,000",
    title: "WEDDING A",
  },
  {
    description: [
      { id: 1, text: "Two-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 2,
    price: "Rp 2,500,000",
    title: "WEDDING B",
  },
  {
    description: [
      { id: 1, text: "One-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 3,
    price: "Rp 1,500,000",
    title: "WEDDING C",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 4,
    price: "Rp 450,000",
    title: "PREWEDDING",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 5,
    price: "Rp 350,000",
    title: "ENGAGEMENT",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 6,
    price: "Rp 300,000",
    title: "GRADUATION",
  },
  {
    description: [
      { id: 1, text: "Hijab Installation" },
      { id: 2, text: "Transportation" },
    ],
    id: 7,
    price: "Rp 200,000",
    title: "REGULAR",
  },
];

interface I {
  session: null | Session;
}

export const Packages: FC<I> = (props): ReactElement => (
  <section className="scroll-mt-[88px] bg-white pt-24" id="packages">
    <div className="container mx-auto flex flex-col items-center gap-10 px-5">
      <div className="w-full max-w-[1000px] space-y-5 text-center">
        <p className="-mb-2 font-semibold tracking-wider text-rose-500">PACKAGES</p>
        <h2 className={`text-6xl ${montaguSlab.className}`}>Choose your makeup package</h2>
        <p>With Hastinulc Makeup Art, You’ll not get only your Dream Makeup services but also at affordable price.</p>
      </div>

      <div className="flex w-fit flex-wrap justify-center gap-5">
        {PACKAGES_DATA.map((dt) => (
          <div className="flex w-80 flex-col gap-4 rounded-lg border border-rose-500 bg-white p-5 text-center shadow-md" key={dt.id}>
            <p className="-mb-2 font-semibold tracking-wider text-rose-500">{dt.title}</p>
            <h3 className={`border-b border-rose-500 pb-4 text-4xl ${montaguSlab.className}`}>{dt.price}</h3>

            <ul className="space-y-2 text-left">
              {dt.description.map((ls, i) => (
                <li key={ls.id}>
                  <span className="font-bold text-rose-500">{i + 1}.</span> {ls.text}
                </li>
              ))}
            </ul>

            <Link
              className={ExampleATWM({
                className: "mt-auto w-full font-semibold",
                color: "rose",
                size: "sm",
                variant: "solid",
              })}
              href={props.session?.user?.status ? "/booking" : "/login"}
              onClick={() => localStorage.setItem("package", dt.title)}
            >
              <FaChevronRight size={14} /> BOOKING NOW
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);
