"use client";

import { useTable } from "@tanstack/react-table";
import { cn } from "cn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table/page";

import { features } from "./data-table-features";

export function DataTable({
	className,
	columns,
	data,
	singleName = "سطر",
	collectionName = "اطلاعات",
	rowNumberOffset = 0,
	total,
	emptyMessage = "موردی پیدا نشد.",
}) {
	const table = useTable({
		features,
		data,
		columns,
	});
	const rows = table.getRowModel().rows;
	const rowCount = total ?? table.getRowCount();

	return (
		<div className={cn("data-table", className)}>
			<div className="data-table-heading">
				<div>
					<h2 className="data-table-title">فهرست {collectionName}</h2>
					<p className="data-table-count">
						{rowCount.toLocaleString("fa-IR")} {singleName} موجود
					</p>
				</div>
			</div>
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
								<TableCell className="data-table-number">{(rowNumberOffset + index + 1).toLocaleString("fa-IR")}</TableCell>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										<table.FlexRender cell={cell} />
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={table.getVisibleLeafColumns().length + 1} className="data-table-empty">
								{emptyMessage}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
