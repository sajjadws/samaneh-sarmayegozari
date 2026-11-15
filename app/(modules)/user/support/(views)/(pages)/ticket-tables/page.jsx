
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { Button } from "@/miz/themes/react/components/button/page";
import { DataTable } from "@/miz/themes/react/components/data-table/data-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/miz/themes/react/components/pagination/page";

import { tickets } from "@/app/(modules)/user/support/database/ticket-data";
import { ticketColumns } from "./components/ticket-columns";

import "../../../assets/css/support.css";

const PAGE_SIZE = 5;

export default function SupportPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tickets.length / PAGE_SIZE);

  const paginatedTickets = tickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="support-page p-6 px-8">
      <div className="support-page-header d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="primary-color font-weight-bold txt-size-high-title">
            تیکت‌های پشتیبانی
          </h1>

          <p>
            از این قسمت می‌توانید درخواست‌های پشتیبانی خود را
            ثبت و پیگیری کنید.
          </p>
        </div>

        <Button
          render={
            <Link href="/madoles/user/support/new" />
          }
        >
          ثبت تیکت جدید
        </Button>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={ticketColumns}
            data={paginatedTickets}
            rowNumberOffset={(currentPage - 1) * PAGE_SIZE}
            collectionName="تیکت"
            singleName="تیکت"
            emptyMessage="هنوز تیکتی ثبت نکرده‌اید."
          />

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      text="قبلی"
                      href="#"
                      aria-disabled={currentPage === 1}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        );
                      }}
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page.toLocaleString("fa-IR")}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      text="بعدی"
                      href="#"
                      aria-disabled={currentPage === totalPages}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        );
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
