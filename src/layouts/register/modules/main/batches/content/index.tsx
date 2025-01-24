"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { ExampleInput } from "@/src/components/interfaces/example/C";
import { RegisterSchema, TRegisterSchema } from "@/src/schemas/auth";
import { POSTRegister } from "@/src/utils/api";

interface IFormField {
  id: number;
  isPassword?: boolean;
  label: string;
  maxLength?: number;
  name: keyof TRegisterSchema;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  type: HTMLInputTypeAttribute;
}

const FORM_FIELD_DATA: IFormField[] = [
  {
    id: 1,
    label: "Name",
    maxLength: 50,
    name: "name",
    type: "text",
  },
  {
    id: 2,
    label: "Username",
    maxLength: 8,
    name: "username",
    onKeyDown: (e: KeyboardEvent) => {
      if (!/^[a-z0-9]$/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
        e.preventDefault();
      }
    },
    type: "text",
  },
  {
    id: 3,
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    id: 4,
    label: "Phone Number",
    maxLength: 15,
    name: "phoneNumber",
    onKeyDown: (e: KeyboardEvent) => {
      if (!/\d/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
        e.preventDefault();
      }
    },
    type: "tel",
  },
  {
    id: 5,
    isPassword: true,
    label: "Password",
    maxLength: 72,
    name: "password",
    type: "password",
  },
  {
    id: 6,
    isPassword: true,
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];

export const Content: FC = (): ReactElement => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = async (dt) => {
    setLoading(true);
    setNotMatch(false);

    if (getValues("password") === getValues("confirmPassword")) {
      try {
        await POSTRegister(dt);
        console.log("Register Success!");
        router.push("/login");
        router.refresh();
      } catch {
        console.log("Register Failed!");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setNotMatch(true);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center px-5">
      <form className="flex w-full max-w-96 flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {FORM_FIELD_DATA.map((dt) => (
          <ExampleInput
            color="rose"
            disabled={loading}
            errorMessage={errors[dt.name]?.message}
            icon={dt.isPassword ? visibility ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} /> : undefined}
            iconOnClick={dt.isPassword ? () => setVisibility((prev) => !prev) : undefined}
            key={dt.id}
            label={dt.label}
            maxLength={dt.maxLength}
            onKeyDown={dt.onKeyDown}
            type={dt.isPassword ? (visibility ? "text" : "password") : dt.type}
            {...register(dt.name)}
          />
        ))}

        <span className="text-center text-sm text-red-600">{notMatch && "Confirm Password does not match Password"}</span>

        <ExampleA className="font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
          {loading ? "Loading..." : "REGISTER"}
        </ExampleA>

        <div className="flex justify-center gap-1">
          <span className="text-xs">Already have an account?</span>
          <Link
            className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
            href={"/login"}
            onClick={(e) => {
              if (loading) {
                e.preventDefault();
              } else {
                setVisibility(false);
                setNotMatch(false);
                reset();
              }
            }}
          >
            Login!
          </Link>
        </div>
      </form>
    </main>
  );
};
