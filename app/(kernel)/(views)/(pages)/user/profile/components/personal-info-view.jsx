export default function PersonalInfoView({ user }) {
	return (
		<>
			<h2 className="txt-size-mid-title primary-color font-weight-bold">اطلاعات شخصی</h2>

			<div className="d-flex flex-column gap-7">
				<div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
					<span>نام و نام خانوادگی:</span>
					<span>
						{[user.userUtilities?.firstName, user.userUtilities?.lastName].filter(Boolean).join(" ") ||
							"بدون نام"}
					</span>
				</div>

				<div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
					<span>ایمیل:</span>
					<span>{user?.email || "ثبت نشده"}</span>
				</div>
			</div>
		</>
	);
}
