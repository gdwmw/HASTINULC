import localFont from "next/font/local";
import Image from "next/image";
import { FC, ReactElement } from "react";

import accentCircle from "@/public/assets/images/background/Accent-Circle.png";
import accentRectangle from "@/public/assets/images/background/Accent-Rectangle.png";
import aboutImage1 from "@/public/assets/images/model/About-1.jpg";
import aboutImage2 from "@/public/assets/images/model/About-2.jpg";
import aboutImage3 from "@/public/assets/images/model/About-3.jpg";
import aboutImage4 from "@/public/assets/images/model/About-4.jpg";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

export const About: FC = (): ReactElement => (
  <section className="scroll-mt-[88px] bg-white py-24" id="about">
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
          specialize in enhancing natural beauty and creating unforgettable looks for every special moment. Trust us to bring out your confidence and
          elegance with our professional makeup services.
        </p>
      </div>
    </div>
  </section>
);
