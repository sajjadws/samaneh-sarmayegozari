"use client";

import { useState } from "react";

import CreateTeamModal from "./creat-team-modal";
import { DataTable } from "@/miz/components/react/data-table/data-table";
import { Separator } from "@/miz/themes/react/components/separator/page";
import { Button } from "@/miz/themes/react/components/button/page";
import { toast } from "@/miz/components/react/toast/page";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { createProjectTeam, updateProjectTeam, deleteProjectTeam } from "../actions/crud";

const steps = [
  "اطلاعات اصلی طرح",
  "اطلاعات فنی",
  "تیم مجری",
  "اسناد و تصاویر",
];

export default function ExecutionTeam({ projectId, teamMembers = [], onRefresh, nextStep, previousStep }) {
	const [editOpen, setEditOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);

	const [selectedMember, setSelectedMember] = useState(null);

	// باز کردن فرم ویرایش
	const handleEditClick = (member) => {
		setSelectedMember(member);
		setEditOpen(true);
	};

	// ذخیره عضو جدید
	const handleCreateSave = async (values) => {
		const result = await createProjectTeam(projectId, values);

		if (!result.ok) {
			toast.add(result.message);
			return;
		}

		setCreateOpen(false);

		toast.success("عضو تیم با موفقیت اضافه شد.");

		await onRefresh?.();
	};

	// ذخیره ویرایش عضو
	const handleEditSave = async (values) => {
		if (!selectedMember?.id) return;

		const result = await updateProjectTeam(selectedMember.id, values);

		if (!result.ok) {
			toast.add(result.message);
			return;
		}

		setEditOpen(false);
		setSelectedMember(null);

		toast.success("اطلاعات عضو تیم ویرایش شد.");

		await onRefresh?.();
	};

	// حذف عضو تیم
	const handleDelete = async (id) => {
		const result = await deleteProjectTeam(id);

		if (!result.ok) {
			toast.add(result.message);
			return;
		}

		toast.success("عضو تیم حذف شد.");

		await onRefresh?.();
	};

	const columns = [
		{
			accessorKey: "fullName",
			header: "نام و نام خانوادگی",
		},
		{
			accessorKey: "position",
			header: "سمت در تیم",
		},
		{
			accessorKey: "expertise",
			header: "تخصص",
		},
		{
			accessorKey: "description",
			header: "شرح مسئولیت",
		},
		{
			id: "actions",
			header: "عملیات",

			cell: ({ row }) => (
				<div className="d-flex gap-2">
					{/* دکمه ویرایش مشابه فاز */}
					<Button size="icon" onClick={() => handleEditClick(row.original)}>
						<IconEdit />
					</Button>

					{/* دکمه حذف */}
					<Button type="button" onClick={() => handleDelete(row.original.id)}>
						حذف
					</Button>
				</div>
			),
		},
	];

	return (
		<div className="d-flex flex-column gap-7 w-100">
				<div className="documents-steps d-flex align-items-center w-100">
					{steps.map((step, index) => (
						<div className="d-flex align-items-center grow-1 w-sm-100" key={step}>
							<div
								className={`documents-step ${
									index < 2 ? "completed" : index === 2 ? "active" : "pending"
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
			<div className="px-8 py-6 bg-card-color radius-all-normal">
				<div className="mb-6">
					<h2 className="text-xl font-bold"> تیم مجری</h2>
					<p className="mt-2 text-sm"> اعضای تیم، اطلاعات تخصصی و مسئولیت هر یک را معرفی کنید.</p>

					<Separator />
				</div>

				{/* دکمه افزودن عضو */}
				<div className="mb-4">
					<Button
						onClick={() => {
							setSelectedMember(null);
							setCreateOpen(true);
						}}
					>
						افزودن عضو جدید
					</Button>
				</div>

				{/* جدول اعضای تیم */}
				<DataTable className="w-100" columns={columns} data={teamMembers} options={[]} />

				{/* مودال افزودن */}
				<CreateTeamModal open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreateSave} />

				{/* مودال ویرایش */}
				<CreateTeamModal
					open={editOpen}
					onOpenChange={(value) => {
						setEditOpen(value);

						if (!value) {
							setSelectedMember(null);
						}
					}}
					initialMember={selectedMember}
					onSave={handleEditSave}
				/>

				{/* دکمه‌های مرحله */}
				<div className="project-modal-footer mt-6 d-flex justify-content-space-between">
					<Button onClick={previousStep}>مرحله قبل</Button>

					<Button onClick={nextStep}>مرحله بعد ←</Button>
				</div>
			</div>
		</div>
	);
}
