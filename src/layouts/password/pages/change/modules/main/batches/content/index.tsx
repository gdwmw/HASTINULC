"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { Input } from "@/src/components/interfaces/inputs";
import { ChangePasswordSchema, TChangePasswordSchema } from "@/src/schemas/password";
import { POSTChangePassword } from "@/src/utils/api/password";

interface IFormField {
  id: number;
  label: string;
  maxLength?: number;
  name: keyof TChangePasswordSchema;
  onKeyDown?: (e: KeyboardEvent) => void;
  type: HTMLInputTypeAttribute;
}

const FORM_FIELDS_DATA: IFormField[] = [
  {
    id: 1,
    label: "Current Password",
    name: "currentPassword",
    type: "password",
  },
  {
    id: 2,
    label: "Password",
    maxLength: 72,
    name: "password",
    type: "password",
  },
  {
    id: 3,
    label: "Confirm Password",
    name: "passwordConfirmation",
    type: "password",
  },
];

export const Content: FC = (): ReactElement => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit: SubmitHandler<TChangePasswordSchema> = async (dt) => {
    setLoading(true);
    setPasswordNotMatch(false);

    if (getValues("password") === getValues("passwordConfirmation")) {
      try {
        await POSTChangePassword(dt);
        console.log("Change Password Success!");
        signOut();
        reset();
      } catch {
        console.log("Change Password Failed!");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setPasswordNotMatch(true);
    }
  };

  return (
    <main className="bg-slate-100">
      <section className="container mx-auto flex h-screen items-center justify-center p-5">
        <div className="relative w-full max-w-[350px] rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg">
          <Link
            className={ExampleATWM({ className: "absolute left-5 top-5 font-semibold", color: "rose", size: "sm", variant: "ghost" })}
            href={"/user/profile"}
          >
            <FaChevronLeft className="ml-1" size={12} /> Back
          </Link>

          <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {FORM_FIELDS_DATA.map((dt) => (
              <Input
                color="rose"
                disabled={loading}
                errorMessage={errors[dt.name]?.message}
                icon={passwordVisibility ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} />}
                iconOnClick={() => setPasswordVisibility((prev) => !prev)}
                key={dt.id}
                label={dt.label}
                maxLength={dt.maxLength}
                onKeyDown={dt.onKeyDown}
                type={passwordVisibility ? "text" : "password"}
                {...register(dt.name)}
              />
            ))}

            <span className="text-center text-sm text-red-600">{passwordNotMatch && "Confirm Password does not match Password"}</span>

            <ExampleA className="w-full font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
              {loading ? "Loading..." : "UPDATE"}
            </ExampleA>
          </form>
        </div>
      </section>
    </main>
  );
};
