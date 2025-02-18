import { KeyboardEvent } from "react";

import { IDatasResponse } from "@/src/types/api";

export const currencyFormat = (amount: number | string, currency: "IDR" | "USD") => {
  const locale = currency === "IDR" ? "id-ID" : "en-US";
  const result = new Intl.NumberFormat(locale, {
    currency: currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(typeof amount === "string" ? parseInt(amount) : amount);

  return result;
};

export const inputValidations = {
  name: (e: KeyboardEvent) => {
    if (!/^[a-zA-Z\s]$/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
      e.preventDefault();
    }
  },
  phoneNumber: (e: KeyboardEvent) => {
    if (!/\d/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key) && !(e.ctrlKey && e.key === "a")) {
      e.preventDefault();
    }
  },
  username: (e: KeyboardEvent) => {
    if (!/^[a-z0-9]$/.test(e.key) && !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab"].includes(e.key)) {
      e.preventDefault();
    }
  },
};

export const questionnairesConditions = (data: IDatasResponse | null | undefined) => {
  const questionnairesLength = data?.questionnaires.length ?? 0;
  return (
    (data?.reviews.length ?? 0) > 0 &&
    (questionnairesLength === 0 ||
      (data?.questionnaires[questionnairesLength - 1].current &&
        new Date().getTime() - new Date(data?.questionnaires[questionnairesLength - 1].current).getTime() > 30 * 24 * 60 * 60 * 1000))
  );
};
