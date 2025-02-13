"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import accentDot from "@/public/assets/images/background/Accent-Dot.png";
import homeImage from "@/public/assets/images/model/Home.png";
import { ExampleA } from "@/src/components/interfaces/example/A";
import { ExampleInput, ExampleSelect } from "@/src/components/interfaces/example/C";
import { SectionHeader } from "@/src/components/section-header";
import { useGlobalStates } from "@/src/context";
import { inputValidations } from "@/src/hooks/functions";
import { PACKAGES_DATA } from "@/src/libs/constants";
import { BookingSchema, TBookingSchema } from "@/src/schemas/home";

interface IFormField {
  id: number;
  isSelect?: boolean;
  label?: string;
  maxLength?: number;
  name: keyof TBookingSchema;
  onKeyDown?: (e: KeyboardEvent) => void;
  options?: string[];
  type?: HTMLInputTypeAttribute;
}

const FORM_FIELDS_DATA: IFormField[] = [
  {
    id: 1,
    label: "Name",
    maxLength: 50,
    name: "name",
    onKeyDown: (e) => inputValidations.name(e),
    type: "text",
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    id: 3,
    label: "Phone Number",
    maxLength: 15,
    name: "phoneNumber",
    onKeyDown: (e) => inputValidations.phoneNumber(e),
    type: "tel",
  },
  {
    id: 4,
    isSelect: true,
    label: "Event",
    name: "event",
    options: PACKAGES_DATA.map((dt) => dt.title),
  },
  {
    id: 5,
    label: "Date",
    name: "date",
    type: "date",
  },
];

interface I {
  session: null | Session;
}

export const Home: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const { setBooking } = useGlobalStates();
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
      phoneNumber: props.session?.user?.phoneNumber ?? "",
    },
    resolver: zodResolver(BookingSchema),
  });

  useEffect(() => {
    if (props.session?.user?.status) {
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        const data: TBookingSchema = JSON.parse(pendingBooking);
        setValue("date", data.date ?? "");
        setValue("event", data.event ?? "");
        localStorage.removeItem("pendingBooking");
      }
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit: SubmitHandler<TBookingSchema> = (dt) => {
    setLoading(true);
    if (props.session?.user?.status) {
      setBooking(dt);
      router.push("/booking");
    } else {
      localStorage.setItem("pendingBooking", JSON.stringify(dt));
      router.push("/login");
    }
  };

  return (
    <section className="bg-rose-200" id="home">
      <div className="flex h-[calc(100vh-88px)] flex-col">
        <section className="relative h-full">
          <div className="container mx-auto size-full px-5">
            <Image alt="Home Image" className="absolute right-0 top-0 h-full w-fit" priority src={homeImage} />

            <SectionHeader
              containerClassname="flex h-full flex-col justify-center gap-6 space-y-0"
              description="Delivering elegant and professional beauty touches for your special moments. Trust us to bring out your best look."
              descriptionClassname="max-w-[650px] text-xl"
              subtitle="BEAUTIFY"
              subtitleClassname="-mb-5"
              title="Professional Makeup Artist"
              titleClassname="max-w-[800px] text-8xl"
            />
          </div>

          <Image alt="Accent Dot" className="absolute -bottom-8 left-36" src={accentDot} />
        </section>

        <section className="h-56 w-full bg-white shadow-lg">
          <div className="container mx-auto size-full px-5">
            <div className="flex size-full items-center justify-center gap-20">
              <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full items-center gap-5">
                  {FORM_FIELDS_DATA.slice(0, 3).map((dt) => (
                    <ExampleInput
                      color="rose"
                      containerClassName="w-64"
                      disabled={loading}
                      errorMessage={errors[dt.name]?.message}
                      key={dt.id}
                      label={dt.label}
                      maxLength={dt.maxLength}
                      onKeyDown={dt.onKeyDown}
                      type={dt.type}
                      {...register(dt.name)}
                    />
                  ))}
                </div>

                <div className="flex w-full items-center gap-5">
                  {FORM_FIELDS_DATA.slice(3).map((dt) =>
                    !dt.isSelect ? (
                      <ExampleInput
                        color="rose"
                        containerClassName="w-64"
                        disabled={loading}
                        errorMessage={errors[dt.name]?.message}
                        key={dt.id}
                        label={dt.label}
                        maxLength={dt.maxLength}
                        onKeyDown={dt.onKeyDown}
                        type={dt.type}
                        {...register(dt.name)}
                      />
                    ) : (
                      <ExampleSelect
                        color="rose"
                        containerClassName="w-64"
                        disabled={loading}
                        errorMessage={errors[dt.name]?.message}
                        key={dt.id}
                        label={dt.label}
                        {...register(dt.name)}
                      >
                        <option value="-">-</option>
                        {dt.options?.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </ExampleSelect>
                    ),
                  )}

                  <ExampleA className="mt-2 w-64 font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
                    <FaChevronRight size={14} /> BOOKING NOW
                  </ExampleA>
                </div>
              </form>

              <address className="flex items-center gap-2">
                <Link
                  className="flex size-20 items-center justify-center rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 active:scale-95 active:bg-rose-100 active:text-rose-400"
                  href={"https://wa.me/6285762346703"}
                  prefetch={false}
                  target="_blank"
                >
                  <IoLogoWhatsapp size={40} />
                </Link>
                <div>
                  <span className="-mb-1 block text-lg not-italic">Need Help? Contact us</span>
                  <Link
                    className="inline-block text-2xl font-semibold text-rose-500 active:scale-95 active:text-rose-400"
                    href={"https://wa.me/6285762346703"}
                    target="_blank"
                  >
                    (085) 7623-4670-3
                  </Link>
                </div>
              </address>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
