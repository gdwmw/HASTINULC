"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLInputTypeAttribute, KeyboardEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";

import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { Input } from "@/src/components/interfaces/inputs";
import { inputValidations } from "@/src/hooks/functions";
import { ProfileSchema, TProfileSchema } from "@/src/schemas/profile";
import { GETDatasByDocumentId, PUTDatas } from "@/src/utils/api/datas";
import { DELETEUpload, POSTUpload } from "@/src/utils/api/upload";
import { PUTUsers } from "@/src/utils/api/users";

interface IFormField {
  id: number;
  label: string;
  maxLength?: number;
  name: keyof TProfileSchema;
  onKeyDown?: (e: KeyboardEvent) => void;
  type: HTMLInputTypeAttribute;
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
    label: "Username",
    maxLength: 8,
    name: "username",
    onKeyDown: (e) => inputValidations.username(e),
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
    onKeyDown: (e) => inputValidations.phoneNumber(e),
    type: "tel",
  },
  {
    id: 5,
    label: "Image",
    name: "image",
    type: "file",
  },
];

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TProfileSchema>({
    defaultValues: {
      email: props.session?.user?.email ?? undefined,
      name: props.session?.user?.name ?? undefined,
      phoneNumber: props.session?.user?.phoneNumber,
      username: props.session?.user?.username,
    },
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    const file = watch("image")?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    // eslint-disable-next-line
  }, [watch("image")]);

  const onSubmit: SubmitHandler<TProfileSchema> = async (dt) => {
    setLoading(true);

    try {
      await PUTUsers({
        email: dt.email,
        id: Number(props.session?.user?.id),
        username: dt.username,
      });

      await PUTDatas({
        documentId: props.session?.user?.datasDocumentId ?? "",
        name: dt.name,
        phoneNumber: dt.phoneNumber,
      });

      if (dt.image && dt.image.length > 0) {
        const res = await GETDatasByDocumentId(props.session?.user?.datasDocumentId ?? "");

        if (res.image.id !== 1) {
          await DELETEUpload(res.image.id);
        }

        await POSTUpload({
          field: "image",
          files: dt.image,
          ref: "api::data.data",
          refId: props.session?.user?.datasId ?? "",
        });
      }

      console.log("Profile Success!");
      signOut();
      reset();
    } catch {
      console.log("Profile Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-100">
      <section className="container mx-auto flex h-screen items-center justify-center p-5">
        <div className="relative flex size-full max-h-[596px] max-w-[450px] justify-center rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg">
          <Link className={ExampleATWM({ className: "absolute left-5 top-5 font-semibold", color: "rose", size: "sm", variant: "ghost" })} href={"/"}>
            <FaChevronLeft className="ml-1" size={12} /> Home
          </Link>

          <form className="w-full max-w-96 space-y-3 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mx-auto aspect-square size-32 overflow-hidden rounded-full border border-gray-200">
              <Image alt="Review Image" className="object-cover" fill quality={50} src={previewImage ?? props.session?.user?.image ?? ""} />
            </div>

            {FORM_FIELDS_DATA.map((dt) => (
              <Input
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
            ))}

            <ExampleA className="w-full font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
              {loading ? "Loading..." : "UPDATE"}
            </ExampleA>
          </form>
        </div>
      </section>
    </main>
  );
};
