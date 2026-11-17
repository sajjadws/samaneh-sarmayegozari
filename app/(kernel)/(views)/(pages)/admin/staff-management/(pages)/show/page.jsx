import ShowUsers from "../../components/user-table";

export default async function StaffListPage({ searchParams }) {
	return (
		<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
			<div className="container w-100 h-100 gap-8">
				<h1>مدیریت کارمندان</h1>
				<ShowUsers searchParams={searchParams} />
			</div>
		</section>
	);
}
