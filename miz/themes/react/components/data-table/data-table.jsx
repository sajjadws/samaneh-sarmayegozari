"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  useTable,
  tableFeatures,
  rowSortingFeature,
  createSortedRowModel,
  flexRender,
  rowSelectionFeature,
  columnVisibilityFeature,
} from "@tanstack/react-table";

import { useSearchParams } from "next/navigation";
import RowNumber from "@/components/row-number";
import PaginationTable from "@/components/pagination";
import FilterTable from "@/components/filter";
import SearchTable from "@/components/search-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/miz/themes/react";

import { cn } from "@/lib/utils";
import EmptyAlert from "@/components/empty-alert";

function checkIsArray(items, options = {}) {
  const { checkLength = false, minLength = 1, maxLength } = options;

  if (!Array.isArray(items)) return false;

  if (checkLength) {
    if (items.length < minLength) return false;

    if (maxLength !== undefined && items.length > maxLength) return false;
  }

  return true;
}

export const DataTable = ({
  data: initialData = [],
  columns = [],
  loading = false,
  selectors = [],
  showPagination = true,
  showSearchBox = true,
  showPerPage = true,
  showRowNumber = true,
  rowIdAccessor = "id",
  emptyState,
  rowId,
  className,
}) => {
  const sp = useSearchParams();
  const pageParam = Number(sp.get("page")) || 1;
  const perPageParam = Number(sp.get("perPage")) || 10;
  const queryParam = sp.get("search") || "";

  const page = pageParam;
  const perPage = perPageParam;

  const [data, setData] = useState(initialData);

  useEffect(() => {
    JSON.stringify(initialData) !== JSON.stringify(data) && setData(initialData);
  }, [initialData]);

  const features = tableFeatures({
    rowSortingFeature,
    rowSelectionFeature,
    columnVisibilityFeature,
    sortedRowModel: createSortedRowModel(),
  });

  const table = useTable({
    features,
    data,
    columns,
  });

  const allRows = table.getRowModel().rows;

  const paginatedRows = useMemo(() => allRows.slice((page - 1) * perPage, page * perPage), [allRows, page, perPage]);

  const totalCount = useMemo(() => allRows.length, [allRows.length]);

  const getRowId = useCallback((row) => row?.original?.[rowIdAccessor] ?? row?.id, [rowIdAccessor]);

  return (
    <div className={cn("d-flex flex-column gap-4 overflow-x-scroll p-4", className)}>
      {selectors.length > 4 && showSearchBox !== false && (
        <SearchTable className="mis-2 min-w-44" query={queryParam} queryTitle="search" />
      )}
      <div
        className={cn(
          "d-flex align-items-start justify-content-space-between w-100 flex-row gap-3",
          selectors.length < 1 && "flex-row flex-wrap",
        )}
      >
        {selectors.length <= 4 && showSearchBox !== false && (
          <SearchTable className="min-w-44" query={queryParam} queryTitle="search" />
        )}
        <div
          className={cn(
            selectors.length <= 4 &&
              "d-flex align-items-end flex-row-md-reverse flex-md-wrap max-w-lg-fit-content justify-content-lg-end max-w-42 grow-1 flex-row gap-2",
            selectors.length > 4 && "d-grid grid-1 grid-md-3 grid-xl-5 gap-2",
          )}
        >
          {showPerPage !== false && (
            <FilterTable
              item={{
                title: "تعداد",
              }}
              queryTitle={"perPage"}
              options={[
                { title: "10", value: 10 },
                { title: "20", value: 20 },
                { title: "50", value: 50 },
                { title: "100", value: 100 },
              ]}
              initialData={initialData}
              setData={setData}
            />
          )}

          {checkIsArray(selectors) &&
            selectors.map((item, idx) => (
              <FilterTable
                key={idx}
                item={item}
                queryTitle={item?.queryTitle}
                options={item?.options}
                initialData={initialData}
                setData={setData}
              />
            ))}
        </div>
      </div>

      {loading ? (
        <p>loding ...</p>
      ) : (data?.length ?? 0) > 0 ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className={cn("primary-color")}>
                {showRowNumber !== false && <TableHead>#</TableHead>}
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {paginatedRows.map((row, idx) => {
              const rid = rowId ? row.original[rowId] : getRowId(row);
              return (
                <TableRow
                  key={rid}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {showRowNumber !== false && (
                    <TableCell>
                      <RowNumber number={idx} />
                    </TableCell>
                  )}

                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : emptyState ? (
        emptyState
      ) : (
        <EmptyAlert/>
      )}

      {showPagination !== false && (data?.length ?? 0) > 0 && (
        <PaginationTable className={"justify-content-end"} page={page} total={totalCount} perPage={perPage} />
      )}
    </div>
  );
};