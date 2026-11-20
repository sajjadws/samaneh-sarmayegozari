import SearchTable from "@/components/search-table";
import { getAllRoles } from "../actions/crud";
import { connection } from "next/server";
import DataTable from "@/components/data-table/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/lib/routes/routes";
import useLoginServer from "@/lib/authentication/is-login-server";

export default async function MyUserContent({ searchParams }) {
	await connection();

	const { page, perPage, q = "", role } = await searchParams;
	const { user } = await useLoginServer();

	const fetchData = await getAllRoles(user?.id, {
		page: +page ? +page : 1,
		perPage: +perPage ? +perPage : 10,
		q: q || "",
		role: role || null,
	});
	const fetchedData = fetchData.data;
	const { data, ...otherData } = fetchedData;

	return (
		<>
			<div className="users-heading">
				<div>
					<span className="users-eyebrow">فرصت‌های سرمایه‌گذاری</span>
					<h1>همه پروژه‌ها</h1>
					<p>پروژه‌ها را بررسی کنید و فرصت مناسب خود را پیدا کنید.</p>
				</div>
			</div>

			<DataTable singleName="پروژه" collectionName="پروژه ها" columns={columns} data={data} option={otherData} total={otherData?.total || 0} />
		</>
	);
}
