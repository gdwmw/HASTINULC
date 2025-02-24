"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ErrorMessage, ExampleA, FormContainer, TextArea } from "@/src/components";
import { QUESTIONS_DATA } from "@/src/libs";
import { QuestionnaireSchema, TQuestionnaireSchema } from "@/src/schemas";
import { POSTQuestionnaires } from "@/src/utils";

interface I {
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TQuestionnaireSchema>({
    resolver: zodResolver(QuestionnaireSchema),
  });

  const onSubmit: SubmitHandler<TQuestionnaireSchema> = async (dt) => {
    setLoading(true);

    const questionsAnswers = QUESTIONS_DATA.map((qst, i) => ({
      answer: dt[`question${i + 1}`],
      id: i + 1,
      question: qst.question,
    }));

    const newPayload = {
      current: new Date(),
      data: props.session?.user?.datasDocumentId ?? "",
      name: props.session?.user?.name ?? "",
      responses: questionsAnswers,
      username: props.session?.user?.username ?? "",
    };

    try {
      await POSTQuestionnaires(newPayload);
      console.log("Questionnaire Success!");
      router.push("/");
      reset();
    } catch {
      console.log("Questionnaire Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-100">
      <FormContainer href={"/"} innerContainerClassName="size-full max-h-[800px] max-w-[800px] flex-col gap-5" label={"Home"}>
        <header>
          <h1 className="text-center text-2xl font-bold text-rose-500">Customer Satisfaction Questionnaire</h1>
          <p className="text-center text-gray-600">Your feedback drives our continuous improvement</p>
        </header>

        <form className="flex flex-col gap-5 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          {QUESTIONS_DATA.map((dt, i) => (
            <div className="space-y-4" key={dt.id}>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                {dt.options !== "textarea" ? (
                  <div className="space-y-2">
                    <h2 className="flex gap-1">
                      <span className="font-bold text-rose-500">{i + 1}.</span>
                      <span>
                        {dt.question}
                        <span className="font-bold text-rose-500"> *</span>
                      </span>
                    </h2>
                    <div className="ml-8 flex gap-3">
                      {Array.isArray(dt.options) &&
                        dt.options.map((opt) => (
                          <label className="flex items-center gap-1" key={opt}>
                            <input className="accent-rose-500" disabled={loading} type="radio" value={opt} {...register(`question${i + 1}`)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                    </div>

                    {errors[`question${i + 1}`]?.message && <ErrorMessage errorMessage={String(errors[`question${i + 1}`]?.message)} />}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="flex gap-1">
                      <span className="font-bold text-rose-500">{i + 1}.</span>
                      <span>{dt.question}</span>
                    </h2>
                    <TextArea
                      color="rose"
                      disabled={loading}
                      fieldsetClassName="py-1 border"
                      legendClassName="px-0 ml-0"
                      {...register(`question${i + 1}`)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <ExampleA className="mx-auto min-h-10 w-64 font-semibold" color="rose" disabled={loading} size="sm" type="submit" variant="solid">
            {loading ? "Loading..." : "SUBMIT"}
          </ExampleA>
        </form>
      </FormContainer>
    </main>
  );
};
