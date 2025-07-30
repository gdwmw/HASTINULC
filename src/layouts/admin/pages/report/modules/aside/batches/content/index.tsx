"use client";

import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FC, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileExport } from "react-icons/fa";

import { DatePickerInput, ExampleA, Input, Select } from "@/src/components";
import { currencyFormat } from "@/src/hooks";
import { IBookingResponse, IMetaResponse } from "@/src/types";
import { GETBooking } from "@/src/utils";

const columns = [
  { key: "id", label: "ID" },
  { key: "documentId", label: "Document ID" },
  { key: "username", label: "Username" },
  { key: "name", label: "Name" },
  { key: "package", label: "Package" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "indicator", label: "Status" },
  { key: "total", label: "Total" },
];

export const Content: FC = (): ReactElement => {
  const [enabledCols, setEnabledCols] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: col.key !== "documentId" }), {}),
  );
  const [dateA, setDateA] = useState<Date | null>(null);
  const [dateB, setDateB] = useState<Date | null>(null);

  const { data } = useQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking("sort[0]=createdAt:desc"),
    queryKey: ["booking"],
  });

  const { register, watch } = useForm();
  const search = watch("search") || "";
  const by = watch("by") || "documentId";

  const handleToggleCol = (key: string) => {
    setEnabledCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = (data?.data || []).filter((dt) => {
    let passDate = true;
    if (dateA) {
      const bookingDate = new Date(dt.date);
      passDate = bookingDate >= dateA;
    }
    if (dateB && passDate) {
      const bookingDate = new Date(dt.date);
      const dateBEnd = new Date(dateB);
      dateBEnd.setHours(23, 59, 59, 999);
      passDate = bookingDate <= dateBEnd;
    }

    let passSearch = true;
    if (search && by) {
      let value = "";
      switch (by) {
        case "date":
          value = dt.date ?? "";
          break;
        case "documentId":
          value = dt.documentId ?? "";
          break;
        case "id":
          value = String(dt.id ?? "");
          break;
        case "indicator":
        case "status":
          value = dt.indicator ?? "";
          break;
        case "name":
          value = dt.name ?? "";
          break;
        case "package":
          value = dt.package ?? "";
          break;
        case "time":
          value = dt.time ?? "";
          break;
        case "total":
          value = String(dt.total ?? "");
          break;
        case "username":
          value = dt.username ?? "";
          break;
        default:
      }
      passSearch = value.toLowerCase().includes(search.toLowerCase());
    }

    return passDate && passSearch;
  });

  // Format tanggal untuk periode (dd/mm/yyyy)
  const formatDateWithLeadingZero = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format tanggal untuk tanda tangan (d MMMM yyyy)
  const formatDateWithMonthName = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <section className="rounded-lg border px-2 pb-2 shadow-md">
        <div className="flex items-center gap-4 overflow-x-auto p-4">
          <span className="-mb-1.5">From</span>

          <DatePickerInput
            className={{ container: "min-w-[200px]" }}
            color="rose"
            label="Date"
            onChange={(value: Date | null) => setDateA(value)}
            selected={dateA}
          />

          <span className="-mb-1.5">To</span>

          <DatePickerInput
            className={{ container: "min-w-[200px]" }}
            color="rose"
            label="Date"
            onChange={(value: Date | null) => setDateB(value)}
            selected={dateB}
          />

          <Input className={{ container: "min-w-[300px] grow" }} color="rose" label="Search" {...register("search")} />

          <Select className={{ container: "min-w-[112px]" }} color="rose" defaultValue={"id"} label="By" {...register("by")}>
            <option value="id">ID</option>
            <option value="documentId">Document ID</option>
            <option value="username">Username</option>
            <option value="name">Name</option>
            <option value="package">Package</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="status">Status</option>
            <option value="total">Total</option>
          </Select>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border p-4 shadow-md">
        <h3 className="text-lg font-semibold">Booking Table</h3>

        <div className="flex flex-wrap gap-2">
          {columns.map((col) => (
            <label className="flex items-center gap-1" key={col.key}>
              <input
                checked={enabledCols[col.key]}
                className="size-3 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-[3px] checked:border-rose-400"
                onChange={() => handleToggleCol(col.key)}
                type="checkbox"
              />
              <span className="whitespace-nowrap">{col.label}</span>
            </label>
          ))}
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {columns.map(
                  (col) =>
                    enabledCols[col.key] && (
                      <th className="border p-2" key={col.key}>
                        {col.label}
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dt) => (
                <tr className="text-center" key={dt.documentId}>
                  {columns.map(
                    (col) =>
                      enabledCols[col.key] && (
                        <td className="border p-2" key={col.key}>
                          {col.key === "id" ? (
                            dt.id
                          ) : col.key === "documentId" ? (
                            dt.documentId
                          ) : col.key === "username" ? (
                            dt.username
                          ) : col.key === "name" ? (
                            dt.name
                          ) : col.key === "package" ? (
                            dt.package
                          ) : col.key === "date" ? (
                            dt.date
                          ) : col.key === "time" ? (
                            dt.time.slice(0, 5)
                          ) : col.key === "indicator" ? (
                            <div
                              className={`mx-auto flex h-6 w-full min-w-fit max-w-24 items-center justify-center whitespace-nowrap rounded-full px-5 text-xs font-semibold text-white ${
                                {
                                  Canceled: "bg-red-400",
                                  "Down Pay": "bg-orange-400",
                                  Expired: "bg-red-400",
                                  "Final Pay": "bg-orange-400",
                                  "On Going": "bg-blue-400",
                                  Rejected: "bg-red-400",
                                  Success: "bg-green-400",
                                  Waiting: "bg-yellow-400",
                                }[dt.indicator] ?? "bg-gray-400"
                              }`}
                            >
                              {dt.indicator}
                            </div>
                          ) : col.key === "total" ? (
                            currencyFormat(dt.total, "USD")
                          ) : (
                            "-"
                          )}
                        </td>
                      ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ExampleA
          className="mt-4 flex items-center gap-2 px-4 py-2"
          color="rose"
          onClick={() => {
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.setTextColor(40, 40, 40);
            doc.setFont("helvetica", "bold");
            doc.text("MAKEUP BOOKING RECAPITULATION", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            let periodeText = "Period: ";
            if (dateA && dateB) {
              periodeText += `${formatDateWithLeadingZero(dateA)} to ${formatDateWithLeadingZero(dateB)}`;
            } else if (dateA) {
              periodeText += `From ${formatDateWithLeadingZero(dateA)}`;
            } else if (dateB) {
              periodeText += `To ${formatDateWithLeadingZero(dateB)}`;
            } else {
              periodeText += "All Data";
            }
            doc.text(periodeText, doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });

            const tableColumn = columns.filter((col) => enabledCols[col.key]).map((col) => col.label);
            const tableRows = filteredData.map((dt) =>
              columns
                .filter((col) => enabledCols[col.key])
                .map((col) => {
                  if (col.key === "total") {
                    return currencyFormat(dt.total, "USD");
                  }
                  if (col.key === "indicator") {
                    return dt.indicator;
                  }
                  if (col.key === "time") {
                    return dt.time?.slice(0, 5);
                  }
                  return dt[col.key as keyof IBookingResponse] ?? "-";
                }),
            );

            autoTable(doc, {
              alternateRowStyles: {
                fillColor: [245, 245, 245],
              },
              // @ts-expect-error - jspdf-autotable
              body: tableRows,
              bodyStyles: {
                halign: "center",
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                textColor: [40, 40, 40],
              },
              head: [tableColumn],
              headStyles: {
                fillColor: [251, 113, 133],
                fontStyle: "bold",
                halign: "center",
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                textColor: [255, 255, 255],
              },
              margin: { top: 45 },
              startY: 40,
              styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
              },
            });

            // @ts-expect-error - jspdf-autotable
            const finalY = doc.lastAutoTable.finalY || 45 + 10;
            const printDate = new Date();

            doc.setFontSize(12);
            doc.text(`Padang, ${formatDateWithMonthName(printDate)}`, doc.internal.pageSize.getWidth() - 70, finalY + 20);
            doc.text("MUA (Makeup Artist)", doc.internal.pageSize.getWidth() - 70, finalY + 25);
            doc.line(doc.internal.pageSize.getWidth() - 70, finalY + 45, doc.internal.pageSize.getWidth() - 20, finalY + 45);
            doc.text("Hastinul Chotimah", doc.internal.pageSize.getWidth() - 70, finalY + 50);

            doc.save("Makeup-Booking-Recapitulation.pdf");
          }}
          size="sm"
          variant="solid"
        >
          <FaFileExport className="text-lg" />
          <span className="font-medium">Export to PDF</span>
        </ExampleA>
      </section>
    </aside>
  );
};
