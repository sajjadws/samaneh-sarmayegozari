
import { getAllProjects } from "./actions/crud";
import { columns } from "./components/columns";
import { DataTable } from "@/miz/components/react/data-table/data-table";
// import SearchTable from "@/components/search-table";
import { Suspense } from "react";
// import HandlePagination from "@/components/pagination";
import CreateProject from "./components/create-project";
import { Link } from "lucide-react";


// import "./projects.css";
// import "../myprojects.css";


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
      <section className="w-100 px-12">
        <div className="d-flex justify-content-space-between align-items-center">
          <div>
            <h2>طرح‌های ثبت شده من</h2>
            <p>مشاهده وضعیت بررسی و پیگیری طرح‌هایی که برای جذب سرمایه ثبت کرده‌اید</p>
          </div>
          <div>
            <Link>بازگشت </Link>
            <CreateProject />
          </div>
        </div>

        {/* <SearchTable q={q} /> */}
        {/* <HandleFilter currentRole={role} /> */}
        <DataTable className="w-100" columns={columns} data={data} options={otherData} />
        {/* <HandlePagination page={page ? +page : 1} perPage={perPage ? +perPage : 10} total={otherData?.total || 0} /> */}
      </section>

    </Suspense>
    
  );
}