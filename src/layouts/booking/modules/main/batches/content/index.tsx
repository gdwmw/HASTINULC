"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, Fragment, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { BookingSummary, DatePickerInput, ExampleATWM, FormContainer, Input, Select, SubmitButton } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { currencyFormat, inputValidations } from "@/src/hooks";
import { PACKAGES_DATA } from "@/src/libs";
import { BookingSchema, TBookingSchema } from "@/src/schemas";
import { IBookingPayload, IBookingResponse } from "@/src/types";
import { POSTBooking } from "@/src/utils";

interface IFormField {
  label?: string;
  maxLength?: number;
  name: keyof TBookingSchema;
  onKeyDown?: (e: KeyboardEvent) => void;
  options?: string[];
  type?: HTMLInputTypeAttribute;
}

const FORM_FIELDS_DATA: IFormField[] = [
  {
    label: "Name",
    maxLength: 50,
    name: "name",
    onKeyDown: (e) => inputValidations.name(e),
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    label: "Phone",
    maxLength: 15,
    name: "phoneNumber",
    onKeyDown: (e) => inputValidations.phoneNumber(e),
    type: "tel",
  },
  {
    label: "Package",
    name: "package",
    options: PACKAGES_DATA.map((dt) => dt.title),
  },
  {
    label: "Date",
    name: "date",
  },
  {
    label: "Time",
    name: "time",
  },
  {
    label: "Person",
    name: "person",
  },
  {
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

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = h.toString().padStart(2, "0");
        const minute = m.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }

    return times.filter((t) => t >= "00:15" && t <= "23:45");
  };

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
      person: 1,
      phoneNumber: booking?.phoneNumber ?? props.session?.user?.phoneNumber,
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
    if (watch("package") === "REGULAR" || watch("package") === "GRADUATION") {
      if (watch("person") > 1) {
        setTax(0);
        setSubtotal(price);
        setTotal(price * watch("person"));
      } else {
        setTax(5);
        setSubtotal(price);
        setTotal(price * watch("person") + 5);
      }
    } else {
      setTax(price * 0.12);
      setSubtotal(price);
      setTotal(price + price * 0.12);
    }
    // eslint-disable-next-line
  }, [watch("package"), watch("person")]);

  const onSubmit: SubmitHandler<TBookingSchema> = (dt) => {
    setTransition(async () => {
      let formattedTime = dt.time;
      if (formattedTime && /^\d{2}:\d{2}$/.test(formattedTime)) {
        formattedTime = `${formattedTime}:00.000`;
      }

      const newPayload: IBookingPayload = {
        ...dt,
        indicator: "Waiting",
        relation_data: props.session?.user?.dataDocumentId ?? "",
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        time: formattedTime,
        total: total.toString(),
        username: props.session?.user?.username ?? "",
      };

      try {
        const res = await POSTBooking(newPayload);

        const whatsappMessage = `*Hastinulc Makeup Art | Booking Details | ${dt.name}*
  
  • *Booking ID:* ${res.documentId}
  • *Name:* ${dt.name}
  • *Email:* ${dt.email}
  • *Phone:* ${dt.phoneNumber}
  
  • *Package:* ${dt.package}
  • *Date:* ${dt.date}
  • *Time:* ${dt.time}
  • *Person:* ${dt.person}
  • *Location:* ${dt.googleMapsLink}
  
  • *Status:* Waiting
  
  • *Subtotal:* ${currencyFormat(subtotal || 0, "USD")}
  • *Tax:* ${currencyFormat(tax || 0, "USD")}
  • *TOTAL:* ${currencyFormat(total || 0, "USD")}

I'm looking forward to your *confirmation*. Thank you!`;

        const encodedMessage = encodeURIComponent(whatsappMessage);

        window.open(`https://wa.me/100000000000?text=${encodedMessage}`, "_blank");

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
            {FORM_FIELDS_DATA.map((dt, i) => {
              if (dt.name === "package") {
                return (
                  <Select
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={i}
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

              if (dt.name === "time") {
                return (
                  <Select
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={i}
                    label={dt.label ?? ""}
                    {...register(dt.name)}
                  >
                    <option className="hidden" value="">
                      --:-- --
                    </option>
                    {generateTimeOptions().map((time, i) => (
                      <option key={i} value={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                );
              }

              if (dt.name === "person") {
                return (
                  <Select
                    className={{ container: watch("package") === "REGULAR" || watch("package") === "GRADUATION" ? "" : "hidden" }}
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    key={i}
                    label={dt.label ?? ""}
                    {...register(dt.name, { valueAsNumber: true })}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Select>
                );
              }

              if (dt.name === "date") {
                return (
                  <DatePickerInput
                    color="rose"
                    dateFormat="yyyy/MM/dd"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    excludeDates={[...(bookedDates ?? []), new Date()]}
                    key={i}
                    label={dt.label ?? ""}
                    minDate={new Date()}
                    onChange={(value: Date | null) => value && setDate(value)}
                    selected={date}
                  />
                );
              }

              if (dt.type === "url") {
                return (
                  <Fragment key={i}>
                    <Input
                      color="rose"
                      disabled={loading}
                      errorMessage={errors[dt.name]?.message}
                      label={dt.label ?? ""}
                      maxLength={dt.maxLength}
                      onKeyDown={dt.onKeyDown}
                      type={dt.type}
                      {...register(dt.name)}
                    />
                    <span className="text-xs italic text-rose-400">*Please share your Google Maps location link</span>
                    <div className="flex justify-center gap-1 max-[380px]:flex-col max-[380px]:items-center">
                      <span className="text-xs">Don&apos;t know how to get a Google Maps link?</span>
                      <Link
                        className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
                        href={"https://drive.google.com/drive/folders/1czzvGaymg_aEkVhRe00CBz-X_PR2hoxA?usp=sharing"}
                        onClick={(e) => loading && e.preventDefault()}
                        target="_blank"
                      >
                        Click here!
                      </Link>
                    </div>
                  </Fragment>
                );
              }

              return (
                <Fragment key={i}>
                  <Input
                    color="rose"
                    disabled={loading}
                    errorMessage={errors[dt.name]?.message}
                    label={dt.label ?? ""}
                    maxLength={dt.maxLength}
                    onKeyDown={dt.onKeyDown}
                    type={dt.type}
                    {...register(dt.name)}
                  />
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
