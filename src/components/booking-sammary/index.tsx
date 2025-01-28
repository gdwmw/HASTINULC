import Link from "next/link";
import { FC, ReactElement } from "react";

import { IBookingsPayload } from "@/src/types/api";

import { ExampleATWM } from "../interfaces/example/A";

type TStatus = "Canceled" | "On Going" | "Payment" | "Rejected" | "Success" | "Waiting";

interface IStatus {
  label: string | TStatus;
}

const Status: FC<IStatus> = (props): ReactElement => (
  <span
    className={`flex h-6 w-full max-w-24 items-center justify-center rounded-full px-5 text-xs font-semibold text-white ${(() => {
      switch (props.label) {
        case "Canceled":
          return "bg-red-400";
        case "On Going":
          return "bg-blue-400";
        case "Payment":
          return "bg-orange-400";
        case "Rejected":
          return "bg-red-400";
        case "Success":
          return "bg-green-400";
        case "Waiting":
          return "bg-yellow-400";
        default:
          return "";
      }
    })()}`}
  >
    {props.label}
  </span>
);

interface IBookingSummary extends Omit<IBookingsPayload, "current" | "data" | "indicator" | "username"> {
  datasDocumentId?: string;
  status?: string | TStatus;
}

export const BookingSummary: FC<IBookingSummary> = (props): ReactElement => (
  <div className="flex w-full max-w-sm flex-col justify-between gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
    <div>
      <h2 className="mb-4 text-center text-lg font-bold tracking-widest text-rose-500">-- BOOKING SUMMARY --</h2>

      <div className="my-2 border-t border-gray-300" />

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Name:</span>
          <span className="font-medium">{props.name || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Event:</span>
          <span className="font-medium">{props.event || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">{props.date || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Time:</span>
          <span className="max-w-60 whitespace-pre-line text-center font-medium">
            {Array.isArray(props.time) && props.time.length > 0 ? props.time.join(`\n`) : "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="font-medium">{props.phoneNumber || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium">{props.email || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Google Maps:</span>
          <Link
            className={ExampleATWM({ className: "font-semibold underline", color: "rose", size: "sm", variant: "ghost" })}
            href={props.googleMapsLink || "#"}
            target="_blank"
          >
            {props.googleMapsLink ? "View Location" : "-"}
          </Link>
        </div>

        {props.status && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status:</span>
            {(() => {
              switch (props.status) {
                case "Canceled":
                  return <Status label="Canceled" />;
                case "On Going":
                  return <Status label="On Going" />;
                case "Payment":
                  return <Status label="Payment" />;
                case "Rejected":
                  return <Status label="Rejected" />;
                case "Success":
                  return <Status label="Success" />;
                case "Waiting":
                  return <Status label="Waiting" />;
                default:
                  return null;
              }
            })()}
          </div>
        )}

        <div className="my-2 border-t border-gray-300" />

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (PPN):</span>
          <span className="font-medium">{props.tax}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{props.subTotal}</span>
        </div>

        <div className="my-2 border-t border-gray-300" />

        <div className="flex justify-between">
          <span className="text-lg font-semibold">TOTAL:</span>
          <span className="text-lg font-bold text-rose-500">{props.total}</span>
        </div>
      </div>
    </div>

    <div className="text-center text-xs text-gray-300">
      <p>BID {props.documentId?.toLocaleUpperCase() ?? "< WILL APPEAR AFTER BOOKING >"}</p>
      <p>{props.datasDocumentId?.toLocaleUpperCase() ?? "< WILL APPEAR AFTER LOGIN >"}</p>
    </div>
  </div>
);
