"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useTable, tableFeatures, rowSortingFeature, createSortedRowModel, flexRender, rowSelectionFeature, columnVisibilityFeature } from "@tanstack/react-table";

import { useSearchParams } from "next/navigation";
// import RowNumber from "@/components/row-number";
// import TableSkeleton from "@/components/skeletons/table-skeleton";
import Pagination from "@/components/pagination";
import FilterTable from "@/components/filter";
import SearchTable from "@/components/search-table";

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
  // showPerPage = true,
  // showRowNumber = true,
  showRowNumber = false,
  rowIdAccessor = "id",
  emptyState,
  rowId,
  // tableBg, handel with sass
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

  // useEffect(() => {
  //   if (!async) {
  //     if (!queryParam) {
  //       setData(initialData);
  //     } else {
  //       const q = queryParam.toLowerCase();
  //       const filtered = (initialData || []).filter((row) =>
  //         Object.values(row ?? {}).some((val) =>
  //           String(val ?? "")
  //             .toLowerCase()
  //             .includes(q),
  //         ),
  //       );
  //       setData(filtered);
  //     }
  //   }
  // }, [async, queryParam, initialData]);

  // useEffect(() => {
  //   setSelectedRows({});
  //   setSelectAll(false);
  // }, [page, data]);

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

  const paginatedRows = useMemo(
    () => allRows.slice(page * perPage, (page + 1) * perPage),
    [allRows, page, perPage],
  );

  const totalCount = useMemo(
    () => (allRows.length),
    [allRows.length],
  );

  const getRowId = useCallback((row) => row?.original?.[rowIdAccessor] ?? row?.id, [rowIdAccessor]);

  return (
    <div className={cn("overflow-x-auto", className)}>
      {selectors.length > 4 && showSearchBox !== false && (
        // <SearchTable useScanner={useScanner} className="mr-2 min-w-44" queryTitle="search" async={async} />
        <SearchTable className="mis-2 min-w-44" query={queryParam} queryTitle="search"/>
      )}
      <div
        className={cn(
          "mb-4 d-flex w-100 flex-column align-items-start justify-conent-space-between gap-3 p-2 flex-md-row align-items-md-end",
          selectors.length < 1 && "flex-row flex-wrap",
        )}
      >
        {selectors.length <= 4 && showSearchBox !== false && (
          // <SearchTable useScanner={useScanner} className="min-w-44" queryTitle="search" async={async} />
          <SearchTable className="min-w-44" query={queryParam} queryTitle="search" />
        )}
        <div
          className={cn(
            // selectors.length <= 4 && "mis-auto d-flex flex-row flex-wrap align-items-end gap-2 flex-row-md-reverse",
            selectors.length <= 4 && "mis-auto d-flex flex-row flex-wrap align-items-end gap-2 flex-row-md-reverse",
            selectors.length <= 2 && "mis-0",
            selectors.length > 4 && "d-grid grid-1 gap-2 grid-md-3 grid-xl-5",
          )}
        >
          {/* {showPerPage !== false && (
            <CustomSelector
              title={selectors && checkIsArray(selectors, { checkLength: true }) ? "تعداد" : null}
              showAll={false}
              queryTitle="perPage"
              className="min-w-20"
              wrapperClassName={selectors.length < 1 && "mt-0"}
              options={[
                { title: "10", value: 10 },
                { title: "20", value: 20 },
                { title: "50", value: 50 },
                { title: "100", value: 100 },
              ]}
            />
          )} */}

          {checkIsArray(selectors) &&
            selectors.map((item, idx) =>
              (
                <FilterTable
                  key={idx}
                  item={item}
                  queryTitle={item?.queryTitle}
                  options={item?.options}
                  initialData={initialData}
                  setData={setData}
                />
              ),
            )}

          {/* {checkIsArray(selectors) &&
            selectors.map((item, idx) =>
              item?.type === "search" ? (
                <SearchTable key={idx} className={cn("min-w-40", item?.className)} {...item} />
              ) : (
                <CustomSelector
                  key={idx}
                  title={item?.title}
                  queryTitle={item?.queryTitle}
                  options={item?.options}
                  className={item?.className}
                  // async={async}
                  initialData={initialData}
                  setData={setData}
                  apiData={item?.type === "apiData" ? { ...item } : null}
                  searchParamsLess={item?.searchParamsLess}
                  itemKey={item?.itemKey}
                />
              ),
            )} */}
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (data?.length ?? 0) > 0 ? (
        // <div className="animate-fade-down max-w-full overflow-x-auto rounded-lg">
        <div className="animate-fade-down max-w-full overflow-x-auto rounded-lg">
          {/* <table className={cn("bg-base-200 table w-full", tableBg)}> */}
          <table className={cn("bg-color table w-100")}>
            <thead>
              {table.getHeaderGroups().map((hg) => (
                // <tr key={hg.id} className={cn("bg-base-200 text-base", tableBg)}>
                <tr key={hg.id} className={cn("bg-color text-color")}>
                  {showRowNumber !== false && (
                    <th className="border-color w-14 border-style-solid bw-1 p-3 text-center txt-size-normal">#</th>
                  )}
                  {hg.headers.map((header) => (
                    <th key={header.id} className="border-color border-style-solid bw-1 p-3 text-center txt-size-normal">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {paginatedRows.map((row, idx) => {
                const rid = rowId ? row.original[rowId] : getRowId(row);
                return (
                  <tr
                    key={rid}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-base-100 border-base-300 border-b"
                  >
                    {showRowNumber !== false && (
                      <td className="border-base-300 border p-3 text-center">
                        <RowNumber number={idx + 1 + page * perPage} />
                      </td>
                    )}

                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="border-base-300 border p-3 text-center">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : emptyState ? (
        emptyState
      ) : (
        <EmptyAlert className="alert-soft" />
      )}

      {showPagination !== false && (data?.length ?? 0) > 0 && (
        <Pagination page={page} total={totalCount} perPage={perPage} />
      )}
    </div>
  );
};