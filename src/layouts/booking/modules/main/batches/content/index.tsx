"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, Fragment, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";

import { BookingSummary } from "@/src/components/booking-sammary";
import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { ExampleInput, ExampleSelect } from "@/src/components/interfaces/example/C";
import { ErrorMessage } from "@/src/components/interfaces/example/C/elements";
import { useGlobalStates } from "@/src/context";
import { inputValidations } from "@/src/hooks/functions";
import { PACKAGES_DATA, TIME_SLOTS_DATA } from "@/src/libs/constants";
import { BookingSchema, TBookingSchema } from "@/src/schemas/booking";
import { IBookingsPayload } from "@/src/types/api";
import { POSTBookings } from "@/src/utils/api";

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
  {
    id: 6,
    name: "time",
    options: TIME_SLOTS_DATA.map((dt) => dt.time),
    type: "checkbox",
  },
  {
    id: 7,
    label: "Google Maps Link",
    name: "googleMapsLink",
    type: "url",
  },
];

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const { booking } = useGlobalStates();
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TBookingSchema>({
    defaultValues: {
      date: booking?.date,
      email: booking?.email ?? props.session?.user?.email ?? undefined,
      event: booking?.event,
      name: booking?.name ?? props.session?.user?.name ?? undefined,
      phoneNumber: booking?.phoneNumber ?? props.session?.user?.phoneNumber,
    },
    resolver: zodResolver(BookingSchema),
  });

  useEffect(() => {
    const selectedPackage = PACKAGES_DATA.find((dt) => dt.title === watch("event"));
    const price = parseInt(selectedPackage?.price ?? "0");
    setTax(price * 0.12);
    setSubtotal(price);
    setTotal(price + price * 0.12);
    // eslint-disable-next-line
  }, [watch("event")]);

  const onSubmit: SubmitHandler<TBookingSchema> = async (dt) => {
    setLoading(true);

    const newPayload: IBookingsPayload = {
      ...dt,
      current: new Date(),
      data: props.session?.user?.datasDocumentId ?? "",
      indicator: "Waiting",
      subTotal: subtotal.toString(),
      tax: tax.toString(),
      total: total.toString(),
      username: props.session?.user?.username ?? "",
    };

    try {
      const res = await POSTBookings(newPayload);
      console.log("Booking Success!");
      router.push(`/user/history/${props.session?.user?.username}/${res.documentId}`);
      reset();
    } catch {
      console.log("Booking Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-100">
      <section className="container mx-auto flex h-screen items-center justify-center p-5">
        <div className="relative flex w-full max-w-[800px] justify-center gap-5 rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg">
          <Link className={ExampleATWM({ className: "absolute left-5 top-5 font-semibold", color: "rose", size: "sm", variant: "ghost" })} href={"/"}>
            <FaChevronLeft className="ml-1" size={12} /> Home
          </Link>

          <form className="flex w-full max-w-96 flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {FORM_FIELDS_DATA.map((dt) =>
              !dt.isSelect && dt.type !== "checkbox" ? (
                <Fragment key={dt.id}>
                  <ExampleInput
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={dt.id}
                    label={dt.label}
                    maxLength={dt.maxLength}
                    onKeyDown={dt.onKeyDown}
                    type={dt.type}
                    {...register(dt.name)}
                  />

                  {dt.type === "url" && (
                    <>
                      <span className="text-xs italic text-rose-400">*Please share Google Maps location link</span>

                      <div className="flex justify-center gap-1">
                        <span className="text-xs">Don&apos;t know how to get Google Maps Link?</span>
                        <Link
                          className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
                          href={"https://drive.google.com/drive/folders/1czzvGaymg_aEkVhRe00CBz-X_PR2hoxA?usp=sharing"}
                          target="_blank"
                        >
                          Click here!
                        </Link>
                      </div>
                    </>
                  )}
                </Fragment>
              ) : dt.isSelect && dt.type !== "checkbox" ? (
                <ExampleSelect
                  color="rose"
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
              ) : (
                <div className="space-y-1" key={dt.id}>
                  <div className="grid grid-cols-2 gap-2">
                    {dt.options?.map((opt, i) => (
                      <label className="relative cursor-pointer" key={i}>
                        <input className="peer absolute opacity-0" disabled={loading} type="checkbox" value={opt} {...register(dt.name)} />
                        <div className="flex select-none items-center justify-center rounded-lg border-2 border-black bg-white p-3 text-sm font-semibold hover:border-rose-300 hover:bg-rose-300 hover:text-white peer-checked:border-rose-400 peer-checked:bg-rose-400 peer-checked:text-white peer-disabled:cursor-not-allowed peer-disabled:border-gray-400 peer-disabled:bg-white peer-disabled:text-gray-400">
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors[dt.name] && <ErrorMessage errorMessage={errors[dt.name]?.message ?? ""} />}
                </div>
              ),
            )}

            <ExampleA className="font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
              {loading ? "Loading..." : "BOOKING NOW"}
            </ExampleA>
          </form>

          <BookingSummary {...watch()} datasDocumentId={props.session?.user?.datasDocumentId} subTotal={subtotal} tax={tax} total={total} />
        </div>
      </section>
    </main>
  );
};
