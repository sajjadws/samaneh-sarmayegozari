import { DataTable } from "@/miz/themes/react/components/data-table/data-table";
import { connection } from "next/server";
// import SearchTable from "@/components/search-table";
import { getAllUsers } from "../../actions/crud";
// import DataTable from "@/components/data-table/data-table";
import { columns } from "../../components/columns";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { routes } from "@/lib/routes/routes";
import useLoginServer from "@/lib/authentication/is-login-server";
import SearchTable from "../../components/search-table";
import FilterTable from "../../components/filter-table";
import { BankAccountStatus, UserStatus } from "@/lib/prisma/prisma-enums";

export async function ShowUsers({ searchParams }) {
	await connection();
	const { page, perPage, q = "", bankAccountStatus, userStatus } = await searchParams;

	const { user } = await useLoginServer();
	const fetchData = await getAllUsers({
		page: +page ? +page : 1,
		perPage: +perPage ? +perPage : 10,
		q: q || "",
		bankAccountStatus,
		userStatus,
	});
	const fetchedData = fetchData.data;
	const { data, ...otherData } = fetchedData;

	return (
		<>
			<div className="d-flex justify-content-space-between w-100">
				<SearchTable q={q} />
				<div className="d-flex gap-3">
					<FilterTable queryName={"bankAccountStatus"} items={BankAccountStatus} />
					<FilterTable queryName={"userStatus"} items={UserStatus} />
				</div>
			</div>
			<DataTable
				className="w-100 h-100 shadow-lg"
				singleName="کاربر"
				collectionName="کاربران"
				columns={columns}
				data={data}
				option={otherData}
				total={otherData?.total || 0}
			/>
		</>
	);
}
