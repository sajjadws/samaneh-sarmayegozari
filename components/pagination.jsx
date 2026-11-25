"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/miz/themes/react";

export default function PaginationTable({ page = 1, perPage = 10, total = 0 }) {
  const lastPage = Math.ceil(Number(total) / Number(perPage));

  const searchParams = useSearchParams();

  const router = useRouter();

  function pushQuery(page = null) {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      page,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious rtl={true} onClick={() => {pushQuery(page - 1)}} text="قبلی" />
            </PaginationItem>
          </>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => {pushQuery(1)}}>1</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => {pushQuery(page - 1)}}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive onClick={() => {pushQuery(page)}}>
            {page}
          </PaginationLink>
        </PaginationItem>

        {lastPage > page && (
          <PaginationItem>
            <PaginationLink onClick={() => {pushQuery(page + 1)}}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {lastPage - 2 > page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {lastPage - 1 > page && (
          <PaginationItem>
            <PaginationLink onClick={() => {pushQuery(lastPage)}}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {lastPage > page && (
          <PaginationItem>
            <PaginationNext rtl={true} onClick={() => {pushQuery(page + 1)}} text="بعدی" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
