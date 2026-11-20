import { getIncompleteProjects } from "./actions/crud";
import { columns } from "./components/columns";
import { DataTable } from "@/miz/components/react/data-table/data-table";
import CreateProject from "./components/create-project";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export const instant = false;
export default async function ProjectsPage() {
	const fetchData = await getIncompleteProjects();

	if (!fetchData.ok) {
		return (
			<section className="w-100 px-12">
				<p className="text-danger">{fetchData.message || "خطا در دریافت اطلاعات پروژه‌ها"}</p>
			</section>
		);
	}

	const projects = fetchData.data || [];

	return (
		<section className="w-100 px-12 py-12 d-flex flex-column gap-10 bg-color">
			<div className="d-flex justify-content-space-between align-items-center">
				<div className="d-flex flex-column gap-1">
					<h2 className="txt-size-mid-title font-weight-bold">طرح‌های ثبت شده من</h2>
					<p className="txt-size-title font-weight-regular text-color">
						مشاهده وضعیت بررسی و پیگیری طرح‌هایی که برای جذب سرمایه ثبت کرده‌اید
					</p>
				</div>

				<div className="d-flex flex-column justify-content-end align-items-end gap-2">
					<Link href="/userdashboard" className="d-flex align-items-center txt-size-normal gap-2">
						بازگشت
						<MoveLeft className="txt-size-normal" />
					</Link>

					<CreateProject />
				</div>
			</div>

			<DataTable className="w-100" columns={columns} data={projects} options={{}} />
		</section>
	);
}
