// import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import { deleteUser } from "../actions/crud";
import Link from "next/link";
import { routes } from "@/lib/routes/routes";
import { Button } from "@/miz/themes/react/components/button/page";
import { toast } from "@/miz/themes/react/components/toast/page";
import { Modal } from "./modal-miz";
// import CreateUserContent from "../../create-user/create-user-content";

export default function CellAction({ cellData }) {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	async function handelDeleteUser() {
		const res = await deleteUser(cellData?.id);
		if (res?.ok) {
			toast.add({
				title: res?.message,
			});
			setDeleteOpen(false);
		}
	}

	return (
		<>
			<div className="d-flex align-items-center gap-2">
				<Button
					size="icon"
					onClick={() => {
						setEditOpen(true);
					}}
				>
					ویرایش دسترسی ها
				</Button>
			</div>

			{/* <Modal
				open={editOpen}
				onOpenChange={setEditOpen}
				onComplete={() => {
					setEditOpen(true);
				}}
			> */}
				{/* <CreateUserContent id={cellData?.id} initialData={{ ...cellData }} onComplete={() => setEditOpen(false)} /> */}
			{/* </Modal> */}
			{/* <Modal open={deleteOpen} onOpenChange={setDeleteOpen}>
				<p>
					آیا از حذف <span>{cellData?.fullName || cellData?.phoneNumber}</span> متمعن هستید ؟
				</p>
				<hr className="mb-2" />
				<div className="d-flex gap-2">
					<Button onClick={handelDeleteUser}>تایید</Button>
					<Button variant="destructive" onClick={() => setDeleteOpen(false)}>
						انصراف
					</Button>
				</div>
			</Modal> */}
		</>
	);
}
