"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ErrorMessage, FormContainer, SubmitButton, TextArea } from "@/src/components";
import { QUESTIONS_DATA } from "@/src/libs";
import { QuestionnaireSchema, TQuestionnaireSchema } from "@/src/schemas";
import { POSTQuestionnaire } from "@/src/utils";

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const [loading, setTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TQuestionnaireSchema>({
    resolver: zodResolver(QuestionnaireSchema),
  });

  const onSubmit: SubmitHandler<TQuestionnaireSchema> = (dt) => {
    setTransition(async () => {
      const feedback = QUESTIONS_DATA.map((qst, i) => ({
        answer: dt[`question${i + 1}`],
        id: i + 1,
        question: qst.question,
      }));

      const newPayload = {
        feedback: feedback,
        name: props.session?.user?.name ?? "",
        relation_data: props.session?.user?.dataDocumentId ?? "",
        username: props.session?.user?.username ?? "",
      };

      try {
        await POSTQuestionnaire(newPayload);
        console.info("Questionnaire Success!");
        router.push("/");
        reset();
      } catch {
        console.warn("Questionnaire Failed!");
      }
    });
  };

  return (
    <main className="bg-slate-100">
      <FormContainer
        className={{
          innerContainer: "size-full max-h-[800px] max-w-[800px] flex-col gap-5",
        }}
        href={"/"}
        label={"Home"}
      >
        <header>
          <h1 className="text-center text-2xl font-bold text-rose-400">Questionnaire</h1>
          <p className="text-center text-gray-600 max-[500px]:text-sm">Your feedback drives our continuous improvement</p>
        </header>

        <form className="flex flex-col gap-5 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          {QUESTIONS_DATA.map((dt, i) => (
            <div className="space-y-4" key={dt.id}>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                {dt.options !== "textarea" ? (
                  <div className="space-y-2">
                    <h2 className="flex gap-1">
                      <span className="font-bold text-rose-400">{i + 1}.</span>
                      <span>
                        {dt.question}
                        <span className="pl-0.5 font-bold text-rose-400">*</span>
                      </span>
                    </h2>
                    <div className="ml-8 flex gap-3 overflow-x-auto max-sm:flex-col">
                      {Array.isArray(dt.options) &&
                        dt.options.map((opt) => (
                          <label className="flex items-center gap-1" key={opt}>
                            <input
                              className="size-3 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-[3px] checked:border-rose-400"
                              disabled={loading}
                              type="radio"
                              value={opt}
                              {...register(`question${i + 1}`)}
                            />
                            <span className="whitespace-nowrap">{opt}</span>
                          </label>
                        ))}
                    </div>

                    {errors[`question${i + 1}`]?.message && <ErrorMessage errorMessage={String(errors[`question${i + 1}`]?.message)} />}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="flex gap-1">
                      <span className="font-bold text-rose-400">{i + 1}.</span>
                      <span>{dt.question}</span>
                    </h2>
                    <TextArea
                      className={{
                        fieldset: "border py-1",
                        legend: "ml-0 px-0",
                      }}
                      color="rose"
                      disabled={loading}
                      label=""
                      {...register(`question${i + 1}`)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <SubmitButton color="rose" disabled={loading} label="SUBMIT" size="sm" variant="solid" />
        </form>
      </FormContainer>
    </main>
  );
};
