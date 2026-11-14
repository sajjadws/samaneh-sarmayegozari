
import { getAllProjects } from "./actions/crud";
import { columns } from "./components/columns";
import { DataTable } from "../../../components/data-table/data-table";
import SearchTable from "@/components/search-table";
import { Suspense } from "react";
import HandlePagination from "@/components/pagination";
import createProject from "./components/create-project";


import "./projects.css";
import "../myprojects.css";


export default async function ProjectsPage({ searchParams }) {
    const { page, perPage, q = "", role } = await searchParams;
  
    const fetchData = await getAllProjects({
        page: page ? +page : 1,
        perPage: perPage ? +perPage : 10,
        q: q || "",
        role: role || null,
    });

    const fetchedData = fetchData.data;
    
    const { data, ...otherData } = fetchedData;

    return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto space-y-4 p-10 py-10">
        <createProject />
        <SearchTable q={q} />
        {/* <HandleFilter currentRole={role} /> */}
        <DataTable columns={columns} data={data} options={otherData} />
        <HandlePagination page={page ? +page : 1} perPage={perPage ? +perPage : 10} total={otherData?.total || 0} />
      </div>
    </Suspense>
    
  );
}