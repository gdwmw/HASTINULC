import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { FaChevronRight } from "react-icons/fa";

import portfolioImage from "@/public/assets/images/model/Portfolio.jpg";
import { ExampleATWM } from "@/src/components/interfaces/example/A";
import { SectionHeader } from "@/src/components/section-header";

export const Portfolio: FC = (): ReactElement => (
  <section className="scroll-mt-[88px] bg-white pt-24" id="portfolio">
    <div className="container mx-auto flex flex-col items-center gap-10 px-5">
      <SectionHeader
        containerClassname="max-w-[1000px] text-center"
        description="Our portfolio highlights the artistry and precision that define our work. From bold, dramatic looks to soft, natural elegance, each image reflects our dedication to perfection. With over 15 years of expertise, we have transformed countless faces into timeless masterpieces for every special occasion. Explore our work and let us inspire your next unforgettable look."
        subtitle="PORTFOLIO"
        title="Showcasing Our Masterpieces"
      />

      <Image alt="Portfolio Image" loading="lazy" src={portfolioImage} width={1000} />

      <Link
        className={ExampleATWM({ className: "w-64 font-semibold", color: "rose", size: "sm", variant: "solid" })}
        href={"https://www.instagram.com/hastinulc_makeupart/"}
        target="_blank"
      >
        <FaChevronRight size={14} /> VIEW MORE
      </Link>
    </div>
  </section>
);
