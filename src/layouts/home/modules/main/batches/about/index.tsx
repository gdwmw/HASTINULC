"use client";

import localFont from "next/font/local";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";
import { FaCheck, FaPlay } from "react-icons/fa";

import accentCircle from "@/public/assets/images/background/Accent-Circle.png";
import accentRectangle from "@/public/assets/images/background/Accent-Rectangle.png";
import aboutImage1 from "@/public/assets/images/model/About-1.jpg";
import aboutImage2 from "@/public/assets/images/model/About-2.jpg";
import aboutImage3 from "@/public/assets/images/model/About-3.jpg";
import aboutImage4 from "@/public/assets/images/model/About-4.jpg";
import aboutImage5 from "@/public/assets/images/model/About-5.jpg";
import aboutImage6 from "@/public/assets/images/model/About-6.jpg";
import aboutImage7 from "@/public/assets/images/model/About-7.jpg";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

export const About: FC = (): ReactElement => {
  const [active, setActive] = useState(false);

  return (
    <section className="flex scroll-mt-[88px] flex-col gap-24 bg-white pt-24" id="about">
      <div className="container relative mx-auto flex items-center justify-center gap-20 px-5">
        <Image alt="Accent Circle" className="absolute -top-10 right-36" src={accentCircle} />

        <div className="relative flex flex-col gap-5">
          <div className="z-[1] flex gap-5">
            <Image alt="About Image" className="rounded-3xl" quality={30} src={aboutImage1} width={200} />
            <Image alt="About Image" className="rounded-3xl" quality={30} src={aboutImage2} width={200} />
          </div>

          <div className="z-[1] flex gap-5">
            <Image alt="About Image" className="rounded-3xl" quality={30} src={aboutImage3} width={200} />
            <Image alt="About Image" className="rounded-3xl" quality={30} src={aboutImage4} width={200} />
          </div>

          <div className="absolute left-1/2 top-1/2 z-[2] flex size-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white">
            <p className={`text-7xl text-rose-500 ${montaguSlab.className}`}>15+</p>
            <p className={`text-center ${montaguSlab.className}`}>
              Years of
              <br />
              Experience
            </p>
          </div>

          <Image alt="Accent Rectangle" className="absolute -bottom-20 -left-36" src={accentRectangle} />
        </div>

        <div className="w-full max-w-[500px] space-y-5 border-b border-rose-200 pb-8">
          <p className="-mb-2 font-semibold tracking-wider text-rose-500">WELCOME TO</p>
          <h2 className={`text-6xl ${montaguSlab.className}`}>Best Professional Makeup Artist</h2>
          <p>
            At Hastinulc Makeup Art, we believe every face tells a story, and we&apos;re here to make it shine. With over 15 years of experience, we
            specialize in enhancing natural beauty and creating unforgettable looks for every special moment. Trust us to bring out your confidence
            and elegance with our professional makeup services.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex justify-between px-5">
        <div className="w-full max-w-[700px] space-y-5">
          <p className="-mb-2 font-semibold tracking-wider text-rose-500">SPECIALS</p>
          <h2 className={`text-6xl ${montaguSlab.className}`}>We’re Here to Make Your Day Memorable</h2>
          <p>
            Every moment deserves to be extraordinary, and we are here to make that happen. From weddings to special events, our expert touch ensures
            you’ll look and feel your absolute best. Let us create memories that last a lifetime with flawless and personalized beauty services.
          </p>
        </div>

        <div className="flex gap-5">
          <Image alt="About Image" src={aboutImage5} width={350} />
          <Image alt="About Image" src={aboutImage6} width={350} />
        </div>
      </div>

      <div className="container relative mx-auto mt-64 flex flex-col items-center justify-center space-y-16 bg-slate-100 px-5 pb-20 pt-80">
        <div className="absolute -top-64 z-[1]">
          {active ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              height={563.28}
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.youtube.com/embed/XHOmBV4js_E?si=aKZzaIeGn4CFfE3z"
              title="YouTube Video Player"
              width={1000}
            />
          ) : (
            <div className="relative">
              <button
                className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-white hover:border-rose-400 hover:text-rose-400 active:scale-95 active:border-rose-300 active:text-rose-300"
                onClick={() => setActive((prev) => !prev)}
                type="button"
              >
                <FaPlay className="-mb-0.5 -mr-1" size={25} />
              </button>
              <Image alt="About Image" src={aboutImage7} width={1000} />
            </div>
          )}
        </div>

        <div className="z-[1] w-full max-w-[700px] space-y-5 text-center">
          <p className="-mb-2 font-semibold tracking-wider text-rose-500">WHY US</p>
          <h2 className={`text-6xl ${montaguSlab.className}`}>Why Choose Us?</h2>
          <p>
            Choosing the right makeup artist is key to making your special day unforgettable. We combine skill, passion, and attention to detail to
            ensure your beauty shines through every moment. Here’s why we stand out.
          </p>
        </div>

        <div className={`z-[1] flex gap-10 ${montaguSlab.className}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">We travel to you, no matter how far</p>
            </div>
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">We provide full services for you</p>
            </div>
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">We you pick out the perfect makeup</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">We keep calm & fun on your special day</p>
            </div>
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">We are a very professional team</p>
            </div>
            <div className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <p className="text-2xl">Quarantee for you who are not satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
