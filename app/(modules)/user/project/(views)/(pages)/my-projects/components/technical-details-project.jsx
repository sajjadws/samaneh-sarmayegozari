"use client";

import { useCallback, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { DataTable } from "@/miz/components/react/data-table/data-table";
import { Button } from "@/miz/themes/react/components/button/page";
import { Separator } from "@/miz/themes/react/components/separator/page";
import DeleteConfirmModal from "./delete-confirm-modal";
import CreateFormPhase from "./creat-form-phase";
import { Modal } from "@/miz/themes/react/components/modal/page";
import CreatePhaseModal from "./creat-phase-modal";
import { updatePhase, getProjectPhases, deletePhase } from "../actions/crud";
import { toast } from "@/miz/components/react/toast/page";
import * as jalaali from "jalaali-js";
import { MoveLeft, MoveRight } from "lucide-react";

const columnHelper = createColumnHelper();

const steps = ["اطلاعات اصلی طرح", "اطلاعات فنی", "تیم مجری", "اسناد و تصاویر"];
export default function TechnicalDetailsProject({ projectId, nextStep, previousStep, initialData }) {
	const [phases, setPhases] = useState([]);
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selectedPhase, setSelectedPhase] = useState(null);

	// دریافت فازها از دیتابیس
	const fetchPhases = useCallback(async () => {
		if (!projectId) return;

		setLoading(true);

		try {
			const result = await getProjectPhases(projectId);

			if (!result?.ok) {
				throw new Error(result?.message || "دریافت فازها ناموفق بود.");
			}

			setPhases(result.data || []);
		} catch (error) {
			console.error("Fetch phases:", error);

			toast.add({
				title: error.message || "خطا در دریافت فازها",
			});
		} finally {
			setLoading(false);
		}
	}, [projectId]);

	useEffect(() => {
		fetchPhases();
	}, [fetchPhases]);

	// باز کردن مودال حذف
	const handleDeleteClick = (phase) => {
		setSelectedPhase(phase);
		setDeleteOpen(true);
	};

	const handleEditClick = (phase) => {
		setSelectedPhase(phase);
		setOpen(true);
	};

	// حذف فاز
	const handleDelete = async () => {
		if (!selectedPhase || deleteLoading) return;

		setDeleteLoading(true);

		try {
			const result = await deletePhase(projectId, selectedPhase.id);

			if (!result?.ok) {
				throw new Error(result?.message || "حذف فاز ناموفق بود.");
			}

			toast.add({
				title: result.message,
			});

			setDeleteOpen(false);
			setSelectedPhase(null);

			await fetchPhases();
		} catch (error) {
			toast.add({
				title: error.message || "خطا در حذف فاز",
			});
		} finally {
			setDeleteLoading(false);
		}
	};

	// نمایش تاریخ
	const formatDate = (value) => {
		if (!value) return "-";

		return new Date(value).toLocaleDateString("fa-IR");
	};

	function convertToJalaliDate(value) {
		if (!value) return "";

		let year;
		let month;
		let day;

		if (value instanceof Date) {
			year = value.getUTCFullYear();
			month = value.getUTCMonth() + 1;
			day = value.getUTCDate();
		} else {
			const date = String(value).split("T")[0];
			const parts = date.split("-");

			if (parts.length !== 3) return "";

			[year, month, day] = parts.map(Number);
		}

		const result = jalaali.toJalaali(year, month, day);

		return `${result.jy}/${result.jm}/${result.jd}`;
	}

	function normalizeJalaliDate(value) {
		if (!value) return "";

		const date = String(value).trim();

		// تبدیل اعداد فارسی و عربی به انگلیسی
		const normalized = date
			.replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
			.replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
			.replace(/[-.]/g, "/");

		const parts = normalized.split("/");

		if (parts.length !== 3) return normalized;

		const [year, month, day] = parts;

		return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
	}

	const handleEditSave = async (values) => {
		try {
			if (!selectedPhase?.id) {
				throw new Error("فازی برای ویرایش انتخاب نشده است.");
			}

			const formattedValues = {
				...values,
				startDate: normalizeJalaliDate(values.startDate),
				endDate: normalizeJalaliDate(values.endDate),
			};

			console.log("Original values:", values);
			console.log("Formatted values:", formattedValues);

			const result = await updatePhase(projectId, selectedPhase.id, formattedValues);

			if (!result?.ok) {
				throw new Error(result?.message || "خطا در ویرایش فاز");
			}

			toast.add({
				title: "فاز با موفقیت ویرایش شد.",
			});

			setOpen(false);
			setSelectedPhase(null);

			await fetchPhases();
		} catch (error) {
			console.error("Edit phase error:", error);

			toast.add({
				title: error.message || "خطا در ویرایش فاز",
			});
		}
	};

	// ستون‌های جدول
	const columns = [
		columnHelper.accessor("title", {
			header: "عنوان فاز",
		}),

		columnHelper.accessor("description", {
			header: "توضیحات",
		}),

		columnHelper.accessor("startDate", {
			header: "تاریخ شروع",
			cell: ({ getValue }) => formatDate(getValue()),
		}),

		columnHelper.accessor("endDate", {
			header: "تاریخ پایان",
			cell: ({ getValue }) => formatDate(getValue()),
		}),

		columnHelper.accessor("totalAmount", {
			header: "مبلغ هدف",
			cell: ({ getValue }) => `${Number(getValue()).toLocaleString("fa-IR")} تومان`,
		}),

		columnHelper.accessor("ProjectedRevenue", {
			header: "درآمد پیش‌بینی شده",
			cell: ({ getValue }) => `${Number(getValue()).toLocaleString("fa-IR")} تومان`,
		}),

		columnHelper.accessor("profitAmount", {
			header: "سود پیش‌بینی شده",
			cell: ({ getValue }) => `${Number(getValue()).toLocaleString("fa-IR")} تومان`,
		}),

		columnHelper.display({
			id: "operations",
			header: "عملیات",
			cell: ({ row }) => {
				const phase = row.original;

				return (
					<div className="flex items-center justify-center gap-2">
						<Button type="button" size="icon" onClick={() => handleEditClick(phase)}>
							<IconEdit />
						</Button>

						<Button
							type="button"
							size="icon"
							variant="destructive"
							onClick={() => handleDeleteClick(phase)}
						>
							<IconTrash />
						</Button>
					</div>
				);
			},
		}),
	];

	if (!projectId) {
		return <p className="text-sm">ابتدا اطلاعات اصلی پروژه را ذخیره کنید.</p>;
	}

	return (
		<div className="scroll-form overflow-hidden width-modal">
			<div className="d-flex flex-column gap-7 w-100 overflow-y-scroll">
			<h2 className="txt-size-mid-titile font-weight-bold">ایجاد طرح سرمایه گذاری جدید</h2>
			<div className="documents-steps d-flex align-items-center justify-content-space-between w-100">
				{steps.map((step, index) => (
					<div className=" d-flex align-items-center w-fit-content w-sm-100" key={step}>
						<div
							className={`documents-step ${
								index === 0 ? "completed" : index === 1 ? "active" : "pending"
							}`}
						>
							{step}
						</div>

						{index !== steps.length - 1 && (
							<div className="documents-step-arrow position-relative d-md-none">
								<span></span>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="bg-card-color radius-all-normal px-6 py-6 shadow-light d-flex flex-column gap-6">
				<div className="d-flex flex-column gap-1">
					<h2 className="txt-size-title font-weight-bold">اطلاعات فنی طرح</h2>
					<p className="txt-size-normal text-color font-weight-medium mb-2">فازهای اجرای طرح و زمان‌بندی هر فاز را مشخص کنید.</p>
					<Separator />
				</div>

				{/* افزودن فاز */}
				<div className="d-flex justify-content-end">
					<CreatePhaseModal projectId={projectId} onSaved={fetchPhases} />
				</div>

				{/* جدول فازها */}
				{loading ? (
					<p className="py-5 text-center">در حال دریافت فازها...</p>
				) : (
					<DataTable className="w-100" columns={columns} data={phases} options={[]} />
				)}

				{/* مودال حذف */}
				<DeleteConfirmModal
					open={deleteOpen}
					onOpenChange={(value) => {
						setDeleteOpen(value);

						if (!value) {
							setSelectedPhase(null);
						}
					}}
					onConfirm={handleDelete}
					loading={deleteLoading}
					title="حذف این فاز؟"
					description="آیا از حذف این فاز اطمینان دارید؟ این عملیات قابل بازگشت نیست."
				/>

				{/* مودال ویرایش فاز */}
				<Modal
					open={open}
					onOpenChange={(value) => {
						setOpen(value);

						if (!value) {
							setSelectedPhase(null);
						}
					}}
					title="ویرایش فاز"
				>
					{open && selectedPhase && (
						<CreateFormPhase
							key={selectedPhase.id}
							initialData={{
								...selectedPhase,

								// تبدیل تاریخ میلادی دیتابیس به شمسی
								startDate: convertToJalaliDate(selectedPhase.startDate),

								endDate: convertToJalaliDate(selectedPhase.endDate),

								// هماهنگ کردن نام فیلدهای دیتابیس با فرم
								targetAmount: String(selectedPhase.totalAmount ?? ""),
								expectedRevenue: String(selectedPhase.ProjectedRevenue ?? ""),
								expectedProfit: String(selectedPhase.profitAmount ?? ""),
							}}
							onSave={handleEditSave}
							onCancel={() => {
								setOpen(false);
								setSelectedPhase(null);
							}}
						/>
					)}
				</Modal>

				{/* دکمه‌های مراحل */}
				<div className="project-modal-footer d-flex justify-content-space-between">
					<Button type="button" onClick={previousStep}>
						<MoveRight />
						مرحله قبل
					</Button>

					<Button type="button" onClick={() => nextStep({})}>
						مرحله بعد 
						<MoveLeft />
					</Button>
				</div>
			</div>
		</div>
		</div>
		
	);
}
