"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

import { BookingSummary } from "@/src/components/booking-sammary";
import { ExampleA, ExampleATWM } from "@/src/components/interfaces/example/A";
import { ExampleTextArea } from "@/src/components/interfaces/example/C";
import { SUGGESTIONS_DATA } from "@/src/libs/constants";
import { ReviewSchema, TReviewSchema } from "@/src/schemas/review";
import { IBookingsResponse, IReviewsPayload } from "@/src/types/api";
import { POSTReviews } from "@/src/utils/api/reviews";

interface I {
  response: IBookingsResponse[];
  selectedBookingSummary: IBookingsResponse | undefined;
  session: null | Session;
  slug: string[];
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
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
    };

    try {
      await POSTReviews(newPayload);
      console.log("Review Success!");
      router.push(`/user/history/${props.session?.user?.username}/${props.slug[1]}`);
      reset();
    } catch {
      console.log("Review Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-100">
      <section className="container mx-auto flex h-screen items-center justify-center p-5">
        <div className="relative flex w-full max-w-[1100px] gap-5 rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg">
          <Link
            className={ExampleATWM({ className: "absolute left-5 top-5 font-semibold", color: "rose", size: "sm", variant: "ghost" })}
            href={`/user/history/${props.session?.user?.username}/${props.slug[1]}`}
          >
            <FaChevronLeft className="ml-1" size={12} /> Back
          </Link>

          <form className="flex w-full max-w-[600px] flex-col items-center justify-center gap-5" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-2xl font-bold text-rose-500">How Was Your Experience?</h1>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <button
                    className={`text-4xl ${ratingValue <= (ratingHover || watch("rating")) ? "text-yellow-400" : "text-gray-300"}`}
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

            <ExampleTextArea
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
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    selectedSuggestions.includes(dt) ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-rose-400 hover:text-white"
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
          </form>

          <div className="flex grow items-start overflow-y-auto h-min-[845px]:items-center">
            <div className="flex w-full justify-center p-2 h-max-[845px]:my-auto">
              <BookingSummary
                {...props.selectedBookingSummary}
                datasDocumentId={props.session?.user?.datasDocumentId}
                documentId={props.slug[1]}
                status={props.selectedBookingSummary?.indicator}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
