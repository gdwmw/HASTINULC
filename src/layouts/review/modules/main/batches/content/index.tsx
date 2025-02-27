"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoStar } from "react-icons/io5";

import { BookingSummary, ExampleA, FormContainer, Input, TextArea } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { SUGGESTIONS_DATA } from "@/src/libs";
import { ReviewSchema, TReviewSchema } from "@/src/schemas";
import { IBookingsResponse, IReviewsPayload } from "@/src/types";
import { POSTReviews, POSTUpload } from "@/src/utils";

interface I {
  selectedBookingSummary: IBookingsResponse | undefined;
  session: null | Session;
  slug: string[];
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const { setOpen } = useGlobalStates();
  const [ratingHover, setRatingHover] = useState(0);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<TReviewSchema>({
    defaultValues: {
      description: "",
      rating: 0,
    },
    resolver: zodResolver(ReviewSchema),
  });

  const handleSuggestionClick = (dt: string) => {
    const newSuggestions = selectedSuggestions.includes(dt) ? selectedSuggestions.filter((t) => t !== dt) : [...selectedSuggestions, dt];
    setSelectedSuggestions(newSuggestions);
    setValue("description", newSuggestions.join(", "));
  };

  const onSubmit: SubmitHandler<TReviewSchema> = async (dt) => {
    setLoading(true);

    const newPayload: IReviewsPayload = {
      ...dt,
      booking: props.slug[1],
      current: new Date(),
      data: props.session?.user?.datasDocumentId,
      name: props.session?.user?.name ?? "",
      username: props.session?.user?.username ?? "",
    };

    try {
      const res = await POSTReviews(newPayload);
      if (dt.images && dt.images?.length > 0 && res.id) {
        await POSTUpload({ field: "images", files: dt.images, ref: "api::review.review", refId: res.id.toString() });
      }
      console.log("Review Success!");
      setOpen({ bookingList: false, bookingSummary: false });
      router.push(`/history/${props.session?.user?.username}/${props.slug[1]}`);
      router.refresh();
      setSelectedSuggestions([]);
      reset();
    } catch {
      console.log("Review Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-100">
      <FormContainer
        href={`/history/${props.session?.user?.username}/${props.slug[1]}`}
        innerContainerClassName="size-full max-h-[821px] max-w-[600px] lg:max-w-[1100px] gap-5"
        label={"Back"}
        onClick={() => setOpen({ bookingList: true, bookingSummary: true })}
      >
        <form className="flex w-full items-start overflow-y-auto lg:max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-auto flex w-full flex-col items-center justify-center gap-4">
            <header>
              <h1 className="text-center text-2xl font-bold text-rose-500">Rate Our Services</h1>
              <p className="text-center text-gray-600 max-[500px]:text-sm">Your feedback drives our continuous improvement</p>
            </header>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <button
                    className={`text-4xl disabled:cursor-not-allowed ${!loading && "hover:scale-110"} ${loading ? "text-gray-300" : ratingValue <= (ratingHover || watch("rating")) ? "text-yellow-400" : "text-gray-300"}`}
                    disabled={loading}
                    key={i}
                    onClick={() => setValue("rating", ratingValue)}
                    onMouseEnter={() => setRatingHover(ratingValue)}
                    onMouseLeave={() => setRatingHover(0)}
                    type="button"
                  >
                    <IoStar />
                  </button>
                );
              })}
            </div>

            <Input
              accept="image/*"
              className="pt-1"
              color="rose"
              containerClassName="w-full"
              disabled={loading}
              errorMessage={errors.images?.message}
              label="Images"
              multiple
              type="file"
              {...register("images")}
            />

            <TextArea
              color="rose"
              containerClassName="w-full"
              disabled={loading}
              errorMessage={errors.description?.message}
              label="Description"
              maxLength={1000}
              {...register("description")}
            />

            <div className="flex w-full flex-wrap justify-center gap-2">
              {SUGGESTIONS_DATA.map((dt, i) => (
                <button
                  className={`flex select-none items-center justify-center rounded-xl border-2 p-3 text-sm font-semibold disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 ${
                    selectedSuggestions.includes(dt)
                      ? "border-rose-300 bg-rose-50 text-rose-500"
                      : "border-gray-200 bg-white text-gray-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
                  }`}
                  disabled={loading}
                  key={i}
                  onClick={() => handleSuggestionClick(dt)}
                  type="button"
                >
                  {dt}
                </button>
              ))}
            </div>

            <ExampleA className="w-64 font-semibold" color="rose" disabled={loading || watch("rating") === 0} size="sm" type="submit" variant="solid">
              {loading ? "Loading..." : "SUBMIT"}
            </ExampleA>
          </div>
        </form>

        <aside className="hidden min-w-fit grow items-start overflow-y-auto lg:flex">
          <div className="my-auto flex w-full justify-center p-2">
            <BookingSummary
              {...props.selectedBookingSummary}
              datasDocumentId={props.session?.user?.datasDocumentId}
              documentId={props.slug[1]}
              status={props.selectedBookingSummary?.indicator}
            />
          </div>
        </aside>
      </FormContainer>
    </main>
  );
};
