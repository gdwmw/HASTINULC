"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, Fragment, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { BookingSummary, DatePickerInput, ErrorMessage, ExampleATWM, FormContainer, Input, Select, SubmitButton } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { inputValidations } from "@/src/hooks";
import { PACKAGES_DATA, TIME_SLOTS_DATA } from "@/src/libs";
import { BookingSchema, TBookingSchema } from "@/src/schemas";
import { IBookingPayload, IBookingResponse } from "@/src/types";
import { POSTBooking } from "@/src/utils";

interface IFormField {
  id: number;
  isDatePicker?: boolean;
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
    label: "Phone",
    maxLength: 15,
    name: "phoneNumber",
    onKeyDown: (e) => inputValidations.phoneNumber(e),
    type: "tel",
  },
  {
    id: 4,
    isSelect: true,
    label: "Package",
    name: "package",
    options: PACKAGES_DATA.map((dt) => dt.title),
  },
  {
    id: 5,
    isDatePicker: true,
    label: "Date",
    name: "date",
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
  response: IBookingResponse[] | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const { booking, setOpen } = useGlobalStates();
  const [date, setDate] = useState(booking?.date ? new Date(booking?.date) : undefined);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setTransition] = useTransition();

  const bookedDates = props.response
    ?.map((dt) => (dt.indicator === "On Going" || dt.indicator === "Success" ? new Date(dt.date) : null))
    .filter((date): date is Date => date !== null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<TBookingSchema>({
    defaultValues: {
      email: booking?.email ?? props.session?.user?.email ?? undefined,
      name: booking?.name ?? props.session?.user?.name ?? undefined,
      package: booking?.package,
      phoneNumber: booking?.phoneNumber ?? props.session?.user?.phoneNumber,
      time: [],
    },
    resolver: zodResolver(BookingSchema),
  });

  useEffect(() => {
    if (date) {
      setValue(
        "date",
        `${date.getFullYear().toString()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        { shouldValidate: true },
      );
    } else {
      setValue("date", "");
    }
    // eslint-disable-next-line
  }, [date]);

  useEffect(() => {
    const selectedPackage = PACKAGES_DATA.find((dt) => dt.title === watch("package"));
    const price = parseInt(selectedPackage?.price ?? "0");
    setTax(price * 0.12);
    setSubtotal(price);
    setTotal(price + price * 0.12);
    // eslint-disable-next-line
  }, [watch("package")]);

  const onSubmit: SubmitHandler<TBookingSchema> = (dt) => {
    setTransition(async () => {
      const newPayload: IBookingPayload = {
        ...dt,
        indicator: "Waiting",
        relation_data: props.session?.user?.dataDocumentId ?? "",
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        total: total.toString(),
        username: props.session?.user?.username ?? "",
      };

      try {
        const res = await POSTBooking(newPayload);

        const whatsappMessage = `*Hastinulc Makeup Art | Booking Details | ${dt.name}*
  
  - *Booking ID:* ${res.documentId}
  - *Name:* ${dt.name}
  - *Email:* ${dt.email}
  - *Phone:* ${dt.phoneNumber}
  
  - *Package:* ${dt.package}
  - *Date:* ${dt.date}
  - *Time:* ${dt.time}
  - *Location:* ${dt.googleMapsLink}
  
  - *Status:* Waiting
  
  - *Subtotal:* Rp${subtotal.toLocaleString()}
  - *Tax (PPN):* Rp${tax.toLocaleString()}
  - *TOTAL:* Rp${total.toLocaleString()}
  
  I'm looking forward to your *confirmation*. Thank you!`;

        const encodedMessage = encodeURIComponent(whatsappMessage);

        window.open(`https://wa.me/6285762346703?text=${encodedMessage}`, "_blank");

        console.info("Booking Success!");
        setOpen({ historyAsideSwitch: true, historyDetailSwitch: false });
        router.push(`/history/${props.session?.user?.username}/${res.documentId}`);
        reset();
      } catch {
        console.warn("Booking Failed!");
      }
    });
  };

  return (
    <main className="bg-slate-100">
      <FormContainer
        className={{
          innerContainer: "size-full max-h-[821px] max-w-[600px] gap-5 lg:max-w-[1000px]",
        }}
        href="/"
        label="Home"
      >
        <form className="flex w-full items-start overflow-y-auto lg:max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-auto flex w-full flex-col justify-center gap-4">
            {FORM_FIELDS_DATA.map((dt) => {
              if (dt.isDatePicker) {
                return (
                  <DatePickerInput
                    color="rose"
                    dateFormat="yyyy/MM/dd"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    excludeDates={bookedDates}
                    key={dt.id}
                    label={dt.label ?? ""}
                    minDate={new Date()}
                    onChange={(value: Date | null) => value && setDate(value)}
                    selected={date}
                  />
                );
              }

              if (dt.isSelect) {
                return (
                  <Select
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={dt.id}
                    label={dt.label ?? ""}
                    {...register(dt.name)}
                  >
                    <option value="-">-</option>
                    {dt.options?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                );
              }

              if (dt.type === "checkbox") {
                return (
                  <div className="space-y-2" key={dt.id}>
                    <div className="grid grid-cols-2 gap-3">
                      {dt.options?.map((opt, i) => (
                        <label className="group relative cursor-pointer" key={i}>
                          <input className="peer absolute opacity-0" disabled={loading} type="checkbox" value={opt} {...register(dt.name)} />
                          <div className="flex select-none items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-3 text-sm font-semibold text-gray-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 peer-checked:border-rose-300 peer-checked:bg-rose-50 peer-checked:text-rose-500 peer-disabled:cursor-not-allowed peer-disabled:border-gray-200 peer-disabled:bg-gray-100 peer-disabled:text-gray-400">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors[dt.name] && <ErrorMessage errorMessage={errors[dt.name]?.message ?? ""} />}
                  </div>
                );
              }

              return (
                <Fragment key={dt.id}>
                  <Input
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={dt.id}
                    label={dt.label ?? ""}
                    maxLength={dt.maxLength}
                    onKeyDown={dt.onKeyDown}
                    type={dt.type}
                    {...register(dt.name)}
                  />
                  {dt.type === "url" && (
                    <>
                      <span className="text-xs italic text-rose-400">*Please share Google Maps location link</span>
                      <div className="flex justify-center gap-1 max-[380px]:flex-col max-[380px]:items-center">
                        <span className="text-xs">Don&apos;t know how to get Google Maps Link?</span>
                        <Link
                          className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
                          href={"https://drive.google.com/drive/folders/1czzvGaymg_aEkVhRe00CBz-X_PR2hoxA?usp=sharing"}
                          onClick={(e) => loading && e.preventDefault()}
                          target="_blank"
                        >
                          Click here!
                        </Link>
                      </div>
                    </>
                  )}
                </Fragment>
              );
            })}

            <SubmitButton color="rose" disabled={loading} label="BOOKING NOW" size="sm" variant="solid" />
          </div>
        </form>

        <aside className="hidden min-w-fit grow items-start overflow-y-auto lg:flex">
          <div className="my-auto flex w-full justify-center p-2">
            <BookingSummary
              data={{
                documentId: props.session?.user?.dataDocumentId ?? "",
                subtotal: subtotal.toString(),
                tax: tax.toString(),
                total: total.toString(),
                ...watch(),
              }}
            />
          </div>
        </aside>
      </FormContainer>
    </main>
  );
};
