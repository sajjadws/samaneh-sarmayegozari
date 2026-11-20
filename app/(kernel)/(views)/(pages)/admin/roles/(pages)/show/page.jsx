import { DataTable } from "@/miz/themes/react/components/data-table/data-table";
import { connection } from "next/server";
// import SearchTable from "@/components/search-table";
import { getAllRoles } from "../../actions/crud";
// import DataTable from "@/components/data-table/data-table";
import { columns } from "../../components/columns";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { routes } from "@/lib/routes/routes";
import useLoginServer from "@/lib/authentication/is-login-server";

export async function ShowUsers({ searchParams }){
        await connection();
        const { page, perPage, q = "", role } = await searchParams;
        const { user } = await useLoginServer();
    
        const fetchData = await getAllRoles({
            page: +page ? +page : 1,
            perPage: +perPage ? +perPage : 10,
            q: q || "",
            role: role || null,
        });
        const fetchedData = fetchData.data;
        console.log("fetchData", fetchData);
        const { data, ...otherData } = fetchedData;

    return (
        <DataTable className="w-100 h-100 shadow-lg" singleName="کاربر" collectionName="کاربران" columns={columns} data={data} option={otherData} total={otherData?.total || 0} />
    );
}