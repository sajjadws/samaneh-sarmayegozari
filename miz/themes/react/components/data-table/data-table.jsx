// "use client";

// import { useTable } from "@tanstack/react-table";
// import { cn } from "cn";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table/page";

// import { features } from "./data-table-features";

// export function DataTable({
// 	className,
// 	columns ,
// 	data,
// 	singleName = "سطر",
// 	collectionName = "اطلاعات",
// 	rowNumberOffset = 0,
// 	total,
// 	emptyMessage = "موردی پیدا نشد.",
// }) {
// 	const table = useTable({
// 		features,
// 		data,
// 		columns,
// 	});
// 	const rows = table.getRowModel().rows;
// 	const rowCount = total ?? table.getRowCount();

// 	return (
// 		<div className={cn("data-table", className)}>
// 			<Table className="data-table-content">
// 				<TableHeader>
// 					{table.getHeaderGroups().map((headerGroup) => (
// 						<TableRow key={headerGroup.id}>
// 							<TableHead key={headerGroup.id} className="data-table-number">#</TableHead>
// 							{headerGroup.headers.map((header) => (
// 								<TableHead key={header.id}>
// 									{header.isPlaceholder ? null : <table.FlexRender header={header} />}
// 								</TableHead>
// 							))}
// 						</TableRow>
// 					))}
// 				</TableHeader>
// 				<TableBody>
// 					{rows.length ? (
// 						rows.map((row, index) => (
// 							<TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
// 								<TableCell key={row.id} className="data-table-number">{(rowNumberOffset + index + 1).toLocaleString("fa-IR")}</TableCell>
// 								{row.getVisibleCells().map((cell) => (
// 									<TableCell key={cell.id}>
// 										<table.FlexRender cell={cell} />
// 									</TableCell>
// 								))}
// 							</TableRow>
// 						))
// 					) : (
// 						<TableRow>
// 							<TableCell colSpan={table.getVisibleLeafColumns().length + 1} className="data-table-empty">
// 								{emptyMessage}
// 							</TableCell>
// 						</TableRow>
// 					)}
// 				</TableBody>
// 			</Table>
// 		</div>
// 	);
// }

"use client";

import { useTable } from "@tanstack/react-table";
import { cn } from "cn";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table/page";

import { features } from "./data-table-features";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "../pagination/page";
import React from "react";

function getPaginationRange(currentPage, pageCount) {
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, index) => index);
	}

	const pages = new Set([0, pageCount - 1, currentPage - 1, currentPage, currentPage + 1]);

	return [...pages].filter((page) => page >= 0 && page < pageCount).sort((a, b) => a - b);
}

export function DataTable({
	className,
	columns,
	data,
	filters,
	singleName = "سطر",
	collectionName = "اطلاعات",
	rowNumberOffset = 0,
	total,
	emptyMessage = "موردی پیدا نشد.",
	searchValue = "",
	onSearchChange,
	searchPlaceholder = "جستجو...",
	showSearch = true,
	showPagination = true,
}) {
	const table = useTable({
		features,
		data,
		columns,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 10,
			},
		},
	});

	const rows = table.getRowModel().rows;
	const rowCount = total ?? table.getRowCount();

	const pageCount = table.getPageCount();
	const currentPage = table.state.pagination.pageIndex;
	const pageSize = table.state.pagination.pageSize;
	const paginationRange = getPaginationRange(currentPage, pageCount);

	const startRow = rowCount === 0 ? 0 : currentPage * pageSize + 1;

	const endRow = Math.min((currentPage + 1) * pageSize, rowCount);

	return (
		<div className={cn("data-table", className)}>
			{/* Toolbar */}
			{(filters || showSearch) && (
				<div className="data-table-toolbar">
					<div className="data-table-filters">{filters}</div>

					{showSearch && (
						<div className="data-table-search">
							<input
								type="search"
								value={searchValue}
								onChange={(event) => onSearchChange?.(event.target.value)}
								placeholder={searchPlaceholder}
								className="data-table-search-input"
							/>

							<span className="data-table-search-icon">
								{/* <IconPlaceholder
									lucide="SearchIcon"
									tabler="IconSearch"
									hugeicons="Search01Icon"
									phosphor="MagnifyingGlassIcon"
									remixicon="RiSearchLine"
								/> */}
							</span>
						</div>
					)}
				</div>
			)}

			{/* Table */}
			<div className="data-table-wrapper">
				<Table className="data-table-content">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								<TableHead className="data-table-number">#</TableHead>

								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : <table.FlexRender header={header} />}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{rows.length ? (
							rows.map((row, index) => (
								<TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
									<TableCell className="data-table-number">
										{(rowNumberOffset + index + 1).toLocaleString("fa-IR")}
									</TableCell>

									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getVisibleLeafColumns().length + 1}
									className="data-table-empty"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{showPagination && pageCount > 0 && (
				<div className="data-table-pagination">
					<div className="data-table-pagination-info">
						نمایش {startRow.toLocaleString("fa-IR")} تا {endRow.toLocaleString("fa-IR")} از{" "}
						{rowCount.toLocaleString("fa-IR")} {collectionName}
					</div>

					<div className="data-table-pagination-controls">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										text="قبلی"
										aria-disabled={!table.getCanPreviousPage()}
										tabIndex={!table.getCanPreviousPage() ? -1 : undefined}
										onClick={(event) => {
											event.preventDefault();

											if (table.getCanPreviousPage()) {
												table.previousPage();
											}
										}}
									/>
								</PaginationItem>

								{paginationRange.map((page, index) => {
									const previousPage = paginationRange[index - 1];
									const hasGap = previousPage !== undefined && page - previousPage > 1;

									return (
										<React.Fragment key={page}>
											{hasGap && (
												<PaginationItem>
													<PaginationEllipsis />
												</PaginationItem>
											)}

											<PaginationItem>
												<PaginationLink
													href="#"
													size="icon"
													isActive={currentPage === page}
													onClick={(event) => {
														event.preventDefault();
														table.setPageIndex(page);
													}}
												>
													{(page + 1).toLocaleString("fa-IR")}
												</PaginationLink>
											</PaginationItem>
										</React.Fragment>
									);
								})}

								<PaginationItem>
									<PaginationNext
										href="#"
										text="بعدی"
										aria-disabled={!table.getCanNextPage()}
										tabIndex={!table.getCanNextPage() ? -1 : undefined}
										onClick={(event) => {
											event.preventDefault();

											if (table.getCanNextPage()) {
												table.nextPage();
											}
										}}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			)}
		</div>
	);
}
