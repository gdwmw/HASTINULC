"use client";

import { Session } from "next-auth";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

import testimonialsImage from "@/public/assets/images/model/Testimonials-1.jpg";
import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { PACKAGES_DATA, TESTIMONIALS_DATA } from "@/src/libs/constants";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

interface I {
  session: null | Session;
}

export const Packages: FC<I> = (props): ReactElement => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="flex scroll-mt-[88px] flex-col gap-24 bg-white pt-24" id="packages">
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

      <div className="container mx-auto flex gap-5 px-5">
        <div className="space-y-5">
          <div className="space-y-5 text-right">
            <p className="-mb-2 font-semibold tracking-wider text-rose-500">TESTIMONIALS</p>
            <h2 className={`text-nowrap text-6xl ${montaguSlab.className}`}>Words from Clients</h2>
          </div>

          <div className="flex flex-col gap-5 rounded-lg bg-black p-5 text-white shadow-md">
            <div className="flex items-center gap-2">
              <Image
                alt="Testimonials Image"
                className="rounded-full border-2 border-rose-500"
                height={64}
                loading="lazy"
                quality={10}
                src={testimonialsImage}
                width={64}
              />
              <div>
                <p className={`text-2xl font-semibold text-rose-500 ${montaguSlab.className}`}>Danielle Jenkins</p>
                <p className="text-sm font-semibold tracking-wider text-white">SUPER MODEL</p>
              </div>
            </div>

            <div className="-mb-4 flex text-amber-400">
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
            </div>

            <p className="text-lg">
              I am beyond impressed with the makeup artistry! The attention to detail and professionalism exceeded all my expectations. The look was
              flawless and lasted all day. Highly recommended!
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg border border-rose-500 bg-white p-8 shadow-md">
          <div className="flex gap-2 transition-transform duration-500" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {TESTIMONIALS_DATA.map((dt) => (
              <div className="min-w-full" key={dt.id}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="Testimonials Image"
                      className="rounded-full border-2 border-rose-500"
                      height={64}
                      loading="lazy"
                      quality={10}
                      src={dt.image}
                      width={64}
                    />
                    <div>
                      <p className={`text-2xl font-semibold text-rose-500 ${montaguSlab.className}`}>{dt.name}</p>
                      <p className="text-sm font-semibold tracking-wider">{dt.role}</p>
                    </div>
                  </div>

                  <div className="-mb-4 flex text-amber-400">
                    {[...Array(dt.rating)].map((_, i) => (
                      <FaStar key={i} size={24} />
                    ))}
                  </div>

                  <p className="text-lg">{dt.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                aria-label={`Go to testimonial ${i + 1}`}
                className={`size-2 rounded-full transition-all ${currentTestimonial === i ? "w-4 bg-rose-500" : "bg-rose-300"}`}
                key={i}
                onClick={() => setCurrentTestimonial(i)}
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
      </div>
    </section>
  );
};
