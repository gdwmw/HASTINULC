"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

import testimonialsImage from "@/public/assets/images/model/Testimonials-1.jpg";
import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { SectionHeader } from "@/src/components/section-header";
import { useGlobalStates } from "@/src/context";
import { currencyFormat } from "@/src/hooks/functions";
import { PACKAGES_DATA, TESTIMONIALS_DATA } from "@/src/libs/constants";

export const Packages: FC = (): ReactElement => {
  const { setBooking } = useGlobalStates();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="flex scroll-mt-[88px] flex-col gap-24 bg-white pt-24" id="packages">
      <section className="container mx-auto flex flex-col items-center gap-10 px-5">
        <SectionHeader
          containerClassname="max-w-[1000px] text-center"
          description="With Hastinulc Makeup Art, You'll not get only your Dream Makeup services but also at affordable price."
          subtitle="PACKAGES"
          title="Choose your makeup package"
        />

        <div className="flex w-fit flex-wrap justify-center gap-5">
          {PACKAGES_DATA.map((dt) => (
            <div className="flex w-80 flex-col gap-4 rounded-lg border border-rose-500 bg-white p-5 text-center shadow-md" key={dt.id}>
              <span className="-mb-2 font-semibold tracking-wider text-rose-500">{dt.title}</span>
              <span className="border-b border-rose-500 pb-4 font-montaguSlab text-4xl">{currencyFormat(dt.price, "IDR")}</span>

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
                href={"/booking"}
                onClick={() => setBooking({ event: dt.title })}
              >
                <FaChevronRight size={14} /> BOOKING NOW
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto flex gap-5 px-5">
        <div className="space-y-5">
          <SectionHeader containerClassname="text-right" subtitle="TESTIMONIALS" title="Words from Clients" titleClassname="text-nowrap" />

          <blockquote className="flex flex-col gap-5 rounded-lg bg-black p-5 text-white">
            <figure className="flex items-center gap-4">
              <Image
                alt="Testimonials Image"
                className="rounded-full border-2 border-rose-500"
                height={64}
                loading="lazy"
                quality={10}
                src={testimonialsImage}
                width={64}
              />
              <figcaption>
                <span className="block font-montaguSlab text-2xl font-semibold text-rose-500">Danielle Jenkins</span>
                <span className="block text-sm font-semibold tracking-wider text-white">SUPER MODEL</span>
              </figcaption>
            </figure>

            <div className="-mb-4 flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <IoStar key={i} size={24} />
              ))}
            </div>

            <p className="text-lg">
              I am beyond impressed with the makeup artistry! The attention to detail and professionalism exceeded all my expectations. The look was
              flawless and lasted all day. Highly recommended!
            </p>
          </blockquote>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg border border-rose-500 bg-white py-8 shadow-md">
          <div className="flex" style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}>
            {TESTIMONIALS_DATA.map((dt) => (
              <blockquote className="flex w-full shrink-0 items-center justify-center px-8" key={dt.id}>
                <div className="flex flex-col gap-5">
                  <figure className="flex items-center gap-4">
                    <Image
                      alt="Testimonials Image"
                      className="rounded-full border-2 border-rose-500"
                      height={64}
                      loading="lazy"
                      quality={10}
                      src={dt.image}
                      width={64}
                    />
                    <figcaption>
                      <span className="block font-montaguSlab text-2xl font-semibold text-rose-500">{dt.name}</span>
                      <span className="block text-sm font-semibold tracking-wider">{dt.role}</span>
                    </figcaption>
                  </figure>

                  <div className="-mb-4 flex text-amber-400">
                    {[...Array(dt.rating)].map((_, i) => (
                      <IoStar key={i} size={24} />
                    ))}
                  </div>

                  <p className="text-lg">{dt.text}</p>
                </div>
              </blockquote>
            ))}
          </div>

          <div className="absolute bottom-[93px] left-1/2 flex w-full max-w-[400px] -translate-x-1/2 gap-2 rounded-full border-b border-rose-500" />

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                className={`size-2 rounded-full ${currentTestimonialIndex === i ? "w-4 bg-rose-500" : "bg-rose-300"}`}
                key={i}
                onClick={() => setCurrentTestimonialIndex(i)}
              />
            ))}
          </div>

          <div className="absolute bottom-5 right-5 flex gap-3">
            <ExampleA
              className="min-w-fit rounded-full ring-2 hover:ring-rose-500 active:ring-rose-600"
              color="rose"
              onClick={prevTestimonial}
              size="sm"
              variant="outline"
            >
              <FaChevronLeft size={16} />
            </ExampleA>

            <ExampleA
              className="min-w-fit rounded-full ring-2 hover:ring-rose-500 active:ring-rose-600"
              color="rose"
              onClick={nextTestimonial}
              size="sm"
              variant="outline"
            >
              <FaChevronRight size={16} />
            </ExampleA>
          </div>
        </div>
      </section>
    </section>
  );
};
