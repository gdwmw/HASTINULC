"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { ExampleInput } from "@/src/components/interfaces/example/C";
import { LoginSchema, TLoginSchema } from "@/src/schemas/auth";

export const Content: FC = (): ReactElement => {
  const router = useRouter();
  const [withEmail, setWithEmail] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema(withEmail ? "Email" : "Username")),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (dt) => {
    setLoading(true);
    setInvalidCredentials(false);

    try {
      const res = await signIn("credentials", {
        identifier: dt.identifier,
        password: dt.password,
        redirect: false,
      });

      if (!res?.ok) {
        setInvalidCredentials(true);
        throw new Error(withEmail ? "Invalid Email or Password" : "Invalid Username or Password");
      }

      console.log("Login Success!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("Login Failed!");
      console.error("--- Authentication Error Message ---", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center px-5">
      <form className="flex w-full max-w-64 flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.identifier?.message}
          label={withEmail ? "Email" : "Username"}
          type="text"
          {...register("identifier")}
        />

        <ExampleInput
          color="rose"
          disabled={loading}
          errorMessage={errors.password?.message}
          icon={visibility ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} />}
          iconOnClick={() => setVisibility((prev) => !prev)}
          label="Password"
          type={visibility ? "text" : "password"}
          {...register("password")}
        />

        <span className="text-center text-sm text-red-600">
          {invalidCredentials && (withEmail ? "Invalid Email or Password" : "Invalid Username or Password")}
        </span>

        <ExampleA className={loading ? "cursor-not-allowed" : ""} color="rose" disabled={loading} size="sm" type="submit" variant="solid">
          {loading ? "Loading..." : "Login"}
        </ExampleA>

        <div className="flex justify-center gap-1">
          <span className="text-xs">Don&apos;t have an account yet?</span>
          <Link
            className={ExampleATWM({ className: "text-xs", color: "rose", disabled: loading, size: "sm", variant: "ghost" })}
            href={"/register"}
            onClick={(e) => {
              loading && e.preventDefault();
              !loading && setVisibility(false);
              !loading && setInvalidCredentials(false);
              !loading && setWithEmail((prev) => !prev);
              !loading && reset();
            }}
          >
            Register!
          </Link>
        </div>

        <div className="flex justify-center gap-1">
          <span className="text-xs">{withEmail ? "Login with username?" : "Login with email?"}</span>
          <ExampleA
            className="text-xs"
            color="rose"
            disabled={loading}
            onClick={() => {
              setVisibility(false);
              setInvalidCredentials(false);
              setWithEmail((prev) => !prev);
              reset();
            }}
            size="sm"
            type="button"
            variant="ghost"
          >
            Click here!
          </ExampleA>
        </div>
      </form>
    </main>
  );
};
