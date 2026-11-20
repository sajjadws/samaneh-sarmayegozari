
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { DataTable } from "@/miz/themes/react/components/data-table/data-table";

import {
  Input,
} from "@/miz/themes/react/components/input/page";

import {
  InputGroup,
} from "@/miz/themes/react/components/input-group/page";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/miz/themes/react/components/pagination/page";

import { logColumns } from "./components/log-columns";

import "../../../assets/css/support.css";

// داده‌های نمایشی لاگ‌ها
const logs = [
  {
    id: "1040",
    userName: "علی رضایی",
    description: "ورود موفق به سامانه",
    createdAt: "2026-11-05T10:30:00",
  },
  {
    id: "1041",
    userName: "محمد موسوی",
    description: "تغییر رمز عبور",
    createdAt: "2026-11-07T14:20:00",
  },
  {
    id: "1042",
    userName: "سارا احمدی",
    description: "ایجاد طرح سرمایه‌گذاری جدید",
    createdAt: "2026-11-11T09:15:00",
  },
  {
    id: "1043",
    userName: "مهدی میرزایی",
    description: "ویرایش اطلاعات پروفایل",
    createdAt: "2026-11-15T12:45:00",
  },
  {
    id: "1044",
    userName: "سهیل امینی",
    description: "ویرایش اطلاعات بانکی",
    createdAt: "2026-11-15T16:20:00",
  },
  {
    id: "1045",
    userName: "میترا زمانی",
    description: "تغییر شماره موبایل",
    createdAt: "2026-12-01T11:00:00",
  },
  {
    id: "1046",
    userName: "علی ضیایی",
    description: "ایجاد طرح سرمایه‌گذاری جدید",
    createdAt: "2026-12-03T08:30:00",
  },
  {
    id: "1047",
    userName: "فاطمه افضلی",
    description: "مشارکت در طرح سرمایه‌گذاری",
    createdAt: "2026-12-10T13:10:00",
  },
  {
    id: "1048",
    userName: "مهدیه منتظری",
    description: "تغییر رمز عبور",
    createdAt: "2026-12-11T15:30:00",
  },
  {
    id: "1049",
    userName: "آیدا افروغ",
    description: "ویرایش اطلاعات پروفایل",
    createdAt: "2026-12-12T10:15:00",
  },
  {
    id: "1050",
    userName: "رضا کریمی",
    description: "ورود موفق به سامانه",
    createdAt: "2026-12-13T09:45:00",
  },
  {
    id: "1051",
    userName: "نگار حسینی",
    description: "ثبت درخواست جدید",
    createdAt: "2026-12-14T12:20:00",
  },
];

const PAGE_SIZE = 10;

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // جستجو
  const filteredLogs = useMemo(() => {
    if (!search.trim()) return logs;

    const query = search.trim().toLocaleLowerCase();

    return logs.filter((log) =>
      [
        log.id,
        log.userName,
        log.description,
      ].some((value) =>
        value.toLocaleLowerCase().includes(query)
      )
    );
  }, [search]);

  // صفحه‌بندی
  const totalPages = Math.ceil(
    filteredLogs.length / PAGE_SIZE
  );

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="support-page p-6 px-8">
      {/* هدر صفحه */}
      <div className="support-page-header d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="primary-color font-weight-bold txt-size-high-title">
            مدیریت لاگ‌ها
          </h1>

          <p>
            مشاهده و پیگیری سوابق فعالیت‌ها و تغییرات انجام‌شده در سامانه
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

      {/* جدول لاگ‌ها */}
      <Card>
        <CardContent className="gap-4 d-flex flex-column">
          {/* جستجو */}
          <div className="d-flex justify-content-start">
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
          </div>

          {/* جدول */}
          <DataTable
            columns={logColumns}
            data={paginatedLogs}
            rowNumberOffset={(currentPage - 1) * PAGE_SIZE}
            collectionName="لاگ"
            singleName="لاگ"
            emptyMessage="لاگی با این مشخصات پیدا نشد."
          />

          {/* صفحه‌بندی */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
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
