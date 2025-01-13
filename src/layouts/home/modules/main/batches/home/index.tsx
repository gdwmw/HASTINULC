"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronRight, FaPhoneAlt } from "react-icons/fa";

import accentDot from "@/public/assets/images/background/Accent-Dot.png";
import homeImage from "@/public/assets/images/model/Home.png";
import { ExampleA } from "@/src/components/interfaces/example/A";
import { ExampleInput, ExampleSelect } from "@/src/components/interfaces/example/C";
import { BookingSchema, TBookingSchema } from "@/src/schemas/home";

const montaguSlab = localFont({ src: "../../../../../../app/fonts/montagu-slab/MontaguSlab-VariableFont_opsz,wght.ttf" });

interface I {
  session: null | Session;
}

export const Home: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<TBookingSchema>({
    defaultValues: {
      email: props.session?.user?.email ?? "",
      name: props.session?.user?.name ?? "",
    },
    resolver: zodResolver(BookingSchema),
  });

  useEffect(() => {
    if (props.session?.user?.status) {
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        const data: TBookingSchema = JSON.parse(pendingBooking);
        setValue("date", data.date ?? "");
        setValue("time", data.time ?? "");
        setValue("event", data.event ?? "");
        localStorage.removeItem("pendingBooking");
      }
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit: SubmitHandler<TBookingSchema> = (dt) => {
    setLoading(true);
    if (props.session?.user?.status) {
      console.log(dt);
    } else {
      localStorage.setItem("pendingBooking", JSON.stringify(dt));
      router.push("/login");
    }
  };

  return (
    <section className="bg-rose-200" id="home">
      <div className="flex h-[calc(100vh-88px)] flex-col">
        <div className="relative h-full">
          <div className="container mx-auto size-full px-5">
            <Image alt="Home Image" className="absolute right-0 top-0 h-full w-fit" src={homeImage} />

            <div className="flex size-full flex-col justify-center gap-6">
              <p className="-mb-5 font-semibold tracking-wider text-rose-500">BEAUTIFY</p>
              <h1 className={`max-w-[800px] text-8xl ${montaguSlab.className}`}>Professional Makeup Artist</h1>
              <p className="max-w-[650px] text-xl">
                Delivering elegant and professional beauty touches for your special moments. Trust us to bring out your best look.
              </p>
            </div>
          </div>

          <Image alt="Accent Dot" className="absolute -bottom-8 left-36" src={accentDot} />
        </div>

        <div className="h-56 w-full bg-white shadow-lg">
          <div className="container mx-auto size-full px-5">
            <div className="flex size-full items-center justify-center gap-20">
              <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full items-center gap-5">
                  <ExampleInput
                    color="rose"
                    containerClassName="w-64"
                    label="Name"
                    type="text"
                    {...register("name")}
                    disabled={loading}
                    errorMessage={errors.name?.message}
                    maxLength={50}
                  />
                  <ExampleInput
                    color="rose"
                    containerClassName="w-64"
                    label="Email"
                    type="email"
                    {...register("email")}
                    disabled={loading}
                    errorMessage={errors.email?.message}
                  />
                  <ExampleInput
                    color="rose"
                    containerClassName="w-64"
                    label="Date"
                    type="date"
                    {...register("date")}
                    disabled={loading}
                    errorMessage={errors.date?.message}
                  />
                </div>

                <div className="flex w-full items-center gap-5">
                  <ExampleInput
                    color="rose"
                    containerClassName="w-64"
                    label="Time"
                    type="time"
                    {...register("time")}
                    disabled={loading}
                    errorMessage={errors.time?.message}
                  />
                  <ExampleSelect
                    color="rose"
                    containerClassName="w-64"
                    label="Event"
                    {...register("event")}
                    disabled={loading}
                    errorMessage={errors.event?.message}
                  >
                    <option value="-">-</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                  </ExampleSelect>
                  <ExampleA className="mt-2 w-64 font-semibold" color="rose" size="sm" type="submit" variant="solid">
                    <FaChevronRight size={14} /> BOOKING NOW
                  </ExampleA>
                </div>
              </form>

              <div className="flex items-center gap-2">
                <Link
                  className="flex size-20 items-center justify-center rounded-full bg-rose-200 text-rose-500 hover:bg-rose-300 hover:text-rose-600 active:scale-95 active:bg-rose-100 active:text-rose-400"
                  href={"https://wa.me/6285762346703"}
                  target="_blank"
                >
                  <FaPhoneAlt size={30} />
                </Link>
                <div>
                  <p className="-mb-1 text-lg italic">Need Help? Contact us</p>
                  <Link
                    className="inline-block text-2xl font-semibold text-rose-500 hover:text-rose-600 active:scale-95 active:text-rose-400"
                    href={"https://wa.me/6285762346703"}
                    target="_blank"
                  >
                    (085) 7623-4670-3
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
