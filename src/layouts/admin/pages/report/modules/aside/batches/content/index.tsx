"use client";

import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FC, ReactElement, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFileExport, FaSortNumericDownAlt, FaSortNumericUpAlt } from "react-icons/fa";

import { DatePickerInput, ExampleA, Input, Select } from "@/src/components";
import { currencyFormat } from "@/src/hooks";
import { IBookingResponse, IMetaResponse } from "@/src/types";
import { GETBooking } from "@/src/utils";

interface IListOfColumns {
  key: string;
  label: string;
}

const LIST_OF_COLUMNS: IListOfColumns[] = [
  { key: "id", label: "ID" },
  { key: "documentId", label: "Document ID" },
  { key: "username", label: "Username" },
  { key: "name", label: "Name" },
  { key: "package", label: "Package" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "person", label: "Person" },
  { key: "indicator", label: "Status" },
  { key: "subtotal", label: "Subtotal" },
  { key: "total", label: "Total" },
];

export const Content: FC = (): ReactElement => {
  const [enabledCols, setEnabledCols] = useState<Record<string, boolean>>(
    LIST_OF_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: col.key !== "documentId" }), {}),
  );
  const [dateA, setDateA] = useState<Date | null>(null);
  const [dateB, setDateB] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState("");
  const [by, setBy] = useState("id");

  const queryParams = [`sort[0]=createdAt:${sortOrder}`, `pagination[pageSize]=${pageSize}`, `pagination[page]=${page}`];

  if (search && by) {
    queryParams.push(`filters[${by}][$contains]=${encodeURIComponent(search)}`);
  }
  if (dateA) {
    queryParams.push(`filters[date][$gte]=${dateA.toISOString().slice(0, 10)}`);
  }
  if (dateB) {
    queryParams.push(`filters[date][$lte]=${dateB.toISOString().slice(0, 10)}`);
  }

  const { data, isFetching, refetch } = useQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking(queryParams.join("&")),
    queryKey: ["booking-report", sortOrder, page, pageSize, search, by, dateA, dateB],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBy(e.target.value);
    setPage(1);
  };
  const handleDateAChange = (value: Date | null) => {
    setDateA(value);
    setPage(1);
  };
  const handleDateBChange = (value: Date | null) => {
    setDateB(value);
    setPage(1);
  };

  const filteredData = data?.data || [];

  const total = data?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  const formatDateWithLeadingZero = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateWithMonthName = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleExportToPDF = () => {
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

    const tableColumn = LIST_OF_COLUMNS.filter((col) => enabledCols[col.key]).map((col) => col.label);
    const tableRows = filteredData.map((dt) =>
      LIST_OF_COLUMNS.filter((col) => enabledCols[col.key]).map((col) => {
        if (col.key === "subtotal") {
          return currencyFormat(dt.subtotal, "USD");
        }
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
  };

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <section className="rounded-lg border px-2 pb-2 shadow-md">
        <div className="flex items-center gap-4 overflow-x-auto p-4">
          <span className="-mb-1.5">From</span>
          <DatePickerInput className={{ container: "min-w-[200px]" }} color="rose" label="Date" onChange={handleDateAChange} selected={dateA} />
          <span className="-mb-1.5">To</span>
          <DatePickerInput className={{ container: "min-w-[200px]" }} color="rose" label="Date" onChange={handleDateBChange} selected={dateB} />
          <Input className={{ container: "min-w-[300px] grow" }} color="rose" label="Search" onChange={handleSearchChange} value={search} />
          <Select className={{ container: "min-w-[112px]" }} color="rose" label="By" onChange={handleByChange} value={by}>
            <option value="id">ID</option>
            <option value="documentId">Document ID</option>
            <option value="username">Username</option>
            <option value="name">Name</option>
            <option value="package">Package</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="person">Person</option>
            <option value="status">Status</option>
            <option value="subtotal">Subtotal</option>
            <option value="total">Total</option>
          </Select>
        </div>
      </section>

      <section className="space-y-4 rounded-lg border p-4 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <ExampleA
            className="h-fit min-h-fit min-w-fit rounded-md p-1.5"
            color="rose"
            onClick={() => {
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              refetch();
            }}
            size="sm"
            variant="solid"
          >
            {sortOrder === "asc" ? <FaSortNumericUpAlt size={14} /> : <FaSortNumericDownAlt size={14} />}
          </ExampleA>
          {LIST_OF_COLUMNS.map((col, i) => (
            <label className="flex items-center gap-1" key={i}>
              <input
                checked={enabledCols[col.key]}
                className="size-3 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-[3px] checked:border-rose-400"
                onChange={() => setEnabledCols((prev) => ({ ...prev, [col.key]: !prev[col.key] }))}
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
                {LIST_OF_COLUMNS.map(
                  (col, i) =>
                    enabledCols[col.key] && (
                      <th className="border p-2" key={i}>
                        {col.label}
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dt, i) => (
                <tr className="text-center" key={i}>
                  {LIST_OF_COLUMNS.map(
                    (col, i) =>
                      enabledCols[col.key] && (
                        <td className="border p-2" key={i}>
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
                          ) : col.key === "person" ? (
                            dt.person
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
                          ) : col.key === "subtotal" ? (
                            currencyFormat(dt.subtotal, "USD")
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

        <section className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              className="rounded border px-2 py-1"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              value={pageSize}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ExampleA
              className="rounded p-1"
              color="rose"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              size="sm"
              variant="ghost"
            >
              <FaChevronLeft />
            </ExampleA>
            {(() => {
              const pages = [];
              if (totalPages < 10) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(
                    <ExampleA
                      className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                      color="rose"
                      disabled={isFetching}
                      key={i}
                      onClick={() => setPage(i)}
                      size="sm"
                      variant={page === i ? "solid" : "ghost"}
                    >
                      {i}
                    </ExampleA>,
                  );
                }
              } else {
                if (page <= 5) {
                  for (let i = 1; i <= 5; i++) {
                    pages.push(
                      <ExampleA
                        className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                        color="rose"
                        disabled={isFetching}
                        key={i}
                        onClick={() => setPage(i)}
                        size="sm"
                        variant={page === i ? "solid" : "ghost"}
                      >
                        {i}
                      </ExampleA>,
                    );
                  }
                  pages.push(<span key="start-ellipsis">...</span>);
                  pages.push(
                    <ExampleA
                      className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                      color="rose"
                      disabled={isFetching}
                      key={totalPages}
                      onClick={() => setPage(totalPages)}
                      size="sm"
                      variant={page === totalPages ? "solid" : "ghost"}
                    >
                      {totalPages}
                    </ExampleA>,
                  );
                } else if (page >= totalPages - 4) {
                  pages.push(
                    <ExampleA
                      className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                      color="rose"
                      disabled={isFetching}
                      key={1}
                      onClick={() => setPage(1)}
                      size="sm"
                      variant={page === 1 ? "solid" : "ghost"}
                    >
                      1
                    </ExampleA>,
                  );
                  pages.push(<span key="end-ellipsis">...</span>);
                  for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(
                      <ExampleA
                        className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                        color="rose"
                        disabled={isFetching}
                        key={i}
                        onClick={() => setPage(i)}
                        size="sm"
                        variant={page === i ? "solid" : "ghost"}
                      >
                        {i}
                      </ExampleA>,
                    );
                  }
                } else {
                  pages.push(
                    <ExampleA
                      className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                      color="rose"
                      disabled={isFetching}
                      key={1}
                      onClick={() => setPage(1)}
                      size="sm"
                      variant={page === 1 ? "solid" : "ghost"}
                    >
                      1
                    </ExampleA>,
                  );
                  pages.push(<span key="mid-ellipsis-1">...</span>);
                  for (let i = page - 1; i <= page + 1; i++) {
                    pages.push(
                      <ExampleA
                        className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                        color="rose"
                        disabled={isFetching}
                        key={i}
                        onClick={() => setPage(i)}
                        size="sm"
                        variant={page === i ? "solid" : "ghost"}
                      >
                        {i}
                      </ExampleA>,
                    );
                  }
                  pages.push(<span key="mid-ellipsis-2">...</span>);
                  pages.push(
                    <ExampleA
                      className="h-fit min-h-fit min-w-fit rounded-md px-2 py-1"
                      color="rose"
                      disabled={isFetching}
                      key={totalPages}
                      onClick={() => setPage(totalPages)}
                      size="sm"
                      variant={page === totalPages ? "solid" : "ghost"}
                    >
                      {totalPages}
                    </ExampleA>,
                  );
                }
              }
              return pages;
            })()}
            <ExampleA
              className="rounded p-1"
              color="rose"
              disabled={page === totalPages || isFetching}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              size="sm"
              variant="ghost"
            >
              <FaChevronRight />
            </ExampleA>
          </div>
        </section>

        <ExampleA className="mt-4 flex items-center gap-2 px-4 py-2" color="rose" onClick={handleExportToPDF} size="sm" variant="solid">
          <FaFileExport />
          Export to PDF
        </ExampleA>
      </section>
    </aside>
  );
};
