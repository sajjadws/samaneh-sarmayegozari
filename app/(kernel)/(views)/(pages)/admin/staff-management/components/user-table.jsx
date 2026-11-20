import { DataTable } from "@/miz/themes/react/components/data-table/data-table";
import { connection } from "next/server";
import { getAllUsers } from "../actions/crud";
import { columns } from "./columns";
import useLoginServer from "@/lib/authentication/is-login-server";

export default async function ShowUsers({ searchParams = {} }) {
	await connection();

	const params = await searchParams;
	const { page, perPage, q = "", role } = params || {};
	const { user } = await useLoginServer();

	const fetchData = await getAllUsers(user?.id, {
		page: Number(page) || 1,
		perPage: Number(perPage) || 10,
		q: q || "",
		role: role || null,
	});

	if (!fetchData?.ok || !fetchData.data) {
		return <p role="alert">{fetchData?.message || "دریافت فهرست کارمندان ناموفق بود."}</p>;
	}

	const { data, ...otherData } = fetchData.data;

	return (
		<DataTable
			className="w-100 h-100 shadow-lg"
			singleName="کارمند"
			collectionName="کارمندان"
			columns={columns}
			data={data || []}
			option={otherData}
			total={otherData?.total || 0}
		/>
	);
}
