
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/miz/themes/react/components/card/page";
import { DataTable } from "@/miz/themes/react/components/data-table/data-table";
import { ArrowLeft, Search } from "lucide-react";

import {
  Input,
} from "@/miz/themes/react/components/input/page";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/miz/themes/react/components/input-group/page";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/miz/themes/react/components/select/page";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/miz/themes/react/components/pagination/page";

import { ticketColumns } from "./components/ticket-columns";

import "../../../assets/css/support.css";
import Link from "next/link";

const tickets = [
  {
    id: "TK-1001",
    title: "مشکل در پرداخت هزینه",
    userName: "علی رضایی",
    createdAt: "2026-11-13T10:30:00",
    status: "UNDER_REVIEW",
  },
  {
    id: "TK-1002",
    title: "عدم نمایش اطلاعات حساب",
    userName: "مریم احمدی",
    createdAt: "2026-11-12T14:20:00",
    status: "ANSWERED",
  },
  {
    id: "TK-1003",
    title: "درخواست تغییر شماره تماس",
    userName: "محمد کریمی",
    createdAt: "2026-11-11T09:15:00",
    status: "CLOSED",
  },
  {
    id: "TK-1004",
    title: "خطا هنگام ورود به سامانه",
    userName: "زهرا محمدی",
    createdAt: "2026-11-10T16:45:00",
    status: "UNDER_REVIEW",
  },
  {
    id: "TK-1005",
    title: "مشکل در ثبت درخواست",
    userName: "حسین مرادی",
    createdAt: "2026-11-09T11:00:00",
    status: "ANSWERED",
  },
  {
    id: "TK-1006",
    title: "پیگیری درخواست قبلی",
    userName: "نگار حسینی",
    createdAt: "2026-11-08T13:10:00",
    status: "CLOSED",
  },
];

const PAGE_SIZE = 5;

export default function TicketTablesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (search.trim()) {
      const query = search.trim().toLocaleLowerCase();

      result = result.filter((ticket) =>
        [
          ticket.id,
          ticket.title,
          ticket.userName,
        ].some((value) =>
          value.toLocaleLowerCase().includes(query)
        )
      );
    }

    if (status !== "ALL") {
      result = result.filter(
        (ticket) => ticket.status === status
      );
    }

    result.sort((a, b) => {
      const difference =
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? -difference
        : difference;
    });

    return result;
  }, [search, status, sortOrder]);

  const totalPages = Math.ceil(
    filteredTickets.length / PAGE_SIZE
  );

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
    <div className="support-page p-6 px-8">
      <div className="support-page-header d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="primary-color font-weight-bold txt-size-high-title">
            تیکت‌های پشتیبانی
          </h1>

          <p>
            در این قسمت می‌توانید تیکت‌های ثبت‌شده توسط کاربران را
            مشاهده و پیگیری کنید.
          </p>
        </div>

        <Link
          href="/madoles/admin/support"
          className="new-ticket-back font-weight-bold primary-color d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <ArrowLeft size={20} />
        </Link>
      </div>

      <Card >
        <CardContent className="gap-4 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-space-between gap-3 ">
            <InputGroup className="w-fit-content">
              <Search />
              <Input
                type="search"
                placeholder="جستجو ..."
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
              />
            </InputGroup>

            <div className="d-flex align-items-center gap-3 w-30">
              <Select
                value={status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="min-w-40">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">
                    همه وضعیت‌ها
                  </SelectItem>
                  <SelectItem value="UNDER_REVIEW">
                    در حال بررسی
                  </SelectItem>
                  <SelectItem value="ANSWERED">
                    پاسخ داده شده
                  </SelectItem>
                  <SelectItem value="CLOSED">
                    بسته شده
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortOrder}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="min-w-40">
                  <SelectValue placeholder="مرتب‌سازی" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="newest">
                    جدیدترین
                  </SelectItem>
                  <SelectItem value="oldest">
                    قدیمی‌ترین
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DataTable
            columns={ticketColumns}
            data={paginatedTickets}
            collectionName="تیکت"
            singleName="تیکت"
            emptyMessage="تیکتی با این مشخصات پیدا نشد."
          />

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      text="قبلی"
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) =>
                          Math.max(1, page - 1)
                        );
                      }}
                      aria-disabled={currentPage === 1}
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
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1)
                        );
                      }}
                      aria-disabled={currentPage === totalPages}
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
