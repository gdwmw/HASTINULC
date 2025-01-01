"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { ExampleInput } from "@/src/components/interfaces/example/C";
import { RegisterSchema, TRegisterSchema } from "@/src/schemas/auth";
import { POSTRegister } from "@/src/utils/api";

export const Main: FC = (): ReactElement => {
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
    defaultValues: { confirmPassword: "", email: "", name: "", password: "", phoneNumber: "", username: "" },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = async (dt) => {
    setLoading(true);
    setNotMatch(false);

    if (getValues("password") === getValues("confirmPassword")) {
      try {
        const res = await POSTRegister(dt);

        if (!res?.status) {
          throw new Error("An Error Occurred While Registering!");
        }

        console.log("Register Success!");
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.log("Register Failed!");
        console.error("--- Authentication Error Message ---", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setNotMatch(true);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <form className="flex w-full max-w-96 flex-col gap-3 px-5" onSubmit={handleSubmit(onSubmit)}>
        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.name?.message}
          label={"Name"}
          maxLength={50}
          type="text"
          {...register("name")}
        />

        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.username?.message}
          label={"Username"}
          maxLength={8}
          onKeyDown={(e) => {
            if (!/^[a-z0-9]$/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          type="text"
          {...register("username")}
        />

        <ExampleInput color="rose" disabled={loading} errorMessage={errors.email?.message} label={"Email"} type="email" {...register("email")} />

        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.phoneNumber?.message}
          label={"Phone Number"}
          maxLength={15}
          onKeyDown={(e) => {
            if (!/\d/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          type="tel"
          {...register("phoneNumber")}
        />

        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.password?.message}
          icon={visibility ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} />}
          iconOnClick={() => setVisibility((prev) => !prev)}
          label="Password"
          maxLength={72}
          type={visibility ? "text" : "password"}
          {...register("password")}
        />

        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.confirmPassword?.message}
          icon={visibility ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} />}
          iconOnClick={() => setVisibility((prev) => !prev)}
          label="Confirm Password"
          type={visibility ? "text" : "password"}
          {...register("confirmPassword")}
        />

        <span className="text-center text-sm text-red-600">{notMatch && "Confirm Password does not match Password"}</span>

        <ExampleA className={loading ? "cursor-not-allowed" : ""} color="rose" disabled={loading} size="sm" type="submit" variant="solid">
          {loading ? "Loading..." : "Register"}
        </ExampleA>

        <div className="flex justify-center gap-1">
          <span className="text-xs">Already have an account?</span>
          <Link
            className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
            href={"/login"}
            onClick={(e) => {
              !loading && setVisibility(false);
              !loading && setNotMatch(false);
              !loading && reset();
              loading && e.preventDefault();
            }}
          >
            Login!
          </Link>
        </div>
      </form>
    </main>
  );
};
