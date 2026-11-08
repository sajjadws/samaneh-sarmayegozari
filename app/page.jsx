//  import { DataTable } from "@/miz/themes/react/components/data-table/data-table";


// import { createColumnHelper } from "@tanstack/react-table";
// import CellActions from "./cell-actions";

// const columnHelper = createColumnHelper();

// export const columns = columnHelper.columns([
//   columnHelper.accessor("title", {
//     header: "عنوان دسته بندی",
//   }),
  
//   columnHelper.accessor("display", {
//     header: "عملیات",
//     cell: ({ row }) => {
//       return <CellActions cellData={row.original} />;
//     },
//   }),
// ]);

// export default function HomePage() {
	
// 	const data = [];
// 	return (
// 		<>
// 			<DataTable
// 				columns={columns}
// 				data={data}
// 				total={data.length}
// 				collectionName="کاربران"
// 				singleName="کاربر"
// 			/>
// 			<h1>home page</h1>
// 		</>
// 	);
// }


import { Input } from "@/miz/themes/react/components/input/page";

export default function home(){
	return(
		<>
			<Input />
		</>
	)
}