"use client";

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
import { SectionHeader } from "@/src/components";

export const About: FC = (): ReactElement => {
  const [active, setActive] = useState(false);

  return (
    <section className="flex scroll-mt-[88px] flex-col gap-24 bg-white pt-24" id="about">
      <section className="container relative mx-auto flex items-center justify-center gap-10 px-5 max-lg:flex-col xl:gap-20">
        <Image alt="Accent Circle" className="absolute -top-10 right-36" src={accentCircle} />

        <figure className="relative flex flex-col gap-3 max-lg:order-last sm:gap-5">
          <div className="z-[1] flex gap-3 sm:gap-5">
            <div className="relative aspect-square size-full max-h-[230px] max-w-[230px] overflow-hidden rounded-3xl">
              <Image alt="About Image" className="object-cover" quality={30} src={aboutImage1} width={230} />
            </div>
            <div className="relative aspect-square size-full max-h-[230px] max-w-[230px] overflow-hidden rounded-3xl">
              <Image alt="About Image" className="object-cover" quality={30} src={aboutImage2} width={230} />
            </div>
          </div>

          <div className="z-[1] flex gap-3 sm:gap-5">
            <div className="relative aspect-square size-full max-h-[230px] max-w-[230px] overflow-hidden rounded-3xl">
              <Image alt="About Image" className="object-cover" quality={30} src={aboutImage4} width={230} />
            </div>
            <div className="relative aspect-square size-full max-h-[230px] max-w-[230px] overflow-hidden rounded-3xl">
              <Image alt="About Image" className="object-cover" quality={30} src={aboutImage3} width={230} />
            </div>
          </div>

          <figcaption className="absolute left-1/2 top-1/2 z-[2] flex size-52 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white">
            <span className="font-montaguSlab text-7xl text-rose-500">15+</span>
            <span className="text-center font-montaguSlab">
              Years of
              <br />
              Experience
            </span>
          </figcaption>

          <Image alt="Accent Rectangle" className="absolute -bottom-20 -left-36" src={accentRectangle} />
        </figure>

        <SectionHeader
          containerClassname="max-w-[500px] border-b border-rose-200 pb-8"
          description="At Hastinulc Makeup Art, we believe every face tells a story, and we're here to make it shine. With over 15 years of experience, we specialize in enhancing natural beauty and creating unforgettable looks for every special moment. Trust us to bring out your confidence and elegance with our professional makeup services."
          subtitle="WELCOME TO"
          title="Best Professional Makeup Artist"
          titleClassname="text-4xl sm:text-5xl md:text-6xl"
        />
      </section>

      <section className="container mx-auto flex justify-between gap-10 px-5 max-lg:flex-col lg:gap-5">
        <SectionHeader
          containerClassname="max-w-[700px] max-lg:text-right"
          description="Every moment deserves to be extraordinary, and we are here to make that happen. From weddings to special events, our expert touch ensures you'll look and feel your absolute best. Let us create memories that last a lifetime with flawless and personalized beauty services."
          subtitle="SPECIALS"
          title="We're Here to Make Your Day Memorable"
          titleClassname="text-4xl sm:text-5xl md:text-6xl"
        />

        <div className="flex gap-5">
          <div>
            <Image alt="About Image" src={aboutImage5} />
          </div>
          <div className="lg:mt-auto xl:mt-0">
            <Image alt="About Image" src={aboutImage6} />
          </div>
        </div>
      </section>

      <section className="container relative mx-auto flex flex-col items-center justify-center space-y-16 bg-slate-100 px-5 py-20 sm:mt-36 sm:pt-48 md:mt-48 md:pt-64 lg:mt-64 lg:pt-80">
        <div className="max-sm:w-full sm:absolute sm:inset-x-0 sm:-top-36 sm:z-[1] md:-top-48 lg:-top-64">
          {active ? (
            <div className="px-5">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="mx-auto aspect-video w-full max-w-[1000px] rounded-lg shadow-md"
                referrerPolicy="strict-origin-when-cross-origin"
                src="https://www.youtube.com/embed/XHOmBV4js_E?si=aKZzaIeGn4CFfE3z"
                title="YouTube Video Player"
              />
            </div>
          ) : (
            <div className="relative px-5">
              <button
                className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-white hover:border-rose-400 hover:text-rose-400 active:scale-95 active:border-rose-300 active:text-rose-300"
                onClick={() => setActive((prev) => !prev)}
                type="button"
              >
                <FaPlay className="-mb-0.5 -mr-1" size={25} />
              </button>
              <Image alt="About Image" className="mx-auto aspect-video w-full max-w-[1000px] rounded-lg shadow-md" loading="lazy" src={aboutImage7} />
            </div>
          )}
        </div>

        <SectionHeader
          containerClassname="z-[1] max-w-[700px] text-center"
          description="Choosing the right makeup artist is key to making your special day unforgettable. We combine skill, passion, and attention to detail to ensure your beauty shines through every moment. Here's why we stand out."
          subtitle="WHY US"
          title="Why Choose Us?"
          titleClassname="text-4xl sm:text-5xl md:text-6xl"
        />

        <footer className="z-[1] flex gap-3 font-montaguSlab max-md:flex-col md:gap-10">
          <ul className="space-y-3">
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">We travel to you, no matter how far</span>
            </li>
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">We provide full services for you</span>
            </li>
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">We you pick out the perfect makeup</span>
            </li>
          </ul>

          <ul className="space-y-3">
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">We keep calm & fun on your special day</span>
            </li>
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">We are a very professional team</span>
            </li>
            <li className="flex items-center gap-5">
              <FaCheck className="text-rose-500" size={20} />
              <span className="md:text-sm lg:text-xl xl:text-2xl">Quarantee for you who are not satisfied</span>
            </li>
          </ul>
        </footer>
      </section>
    </section>
  );
};
