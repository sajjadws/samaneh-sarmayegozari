"use client";

export function FundraisingStatus() {
	return <span className="project-status status-fundraising bg-warning-regular-color radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">در حال جذب سرمایه</span>;
}

export function InProgressStatus() {
	return <span className="project-status status-in-progress bg-information-regular-color radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">در حال اجرا</span>;
}

export function CompletedStatus() {
	return <span className="project-status status-completed bg-success-regular-color radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">تکمیل‌شده</span>;
}

export default function ProjectStatusBadge({ status }) {
	const statusMap = {
		FUNDRAISING: <FundraisingStatus />,
		IN_PROGRESS: <InProgressStatus />,
		COMPLETED: <CompletedStatus />,
	};

	return statusMap[status] || <span className="project-status status-unknown radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">نامشخص</span>;
}

export function PendingStatus() {
	return <span className="project-status status-pending  radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">در انتظار پرداخت</span>;
}

export function PaidStatus() {
	return <span className="project-status status-paid bg-success-regular-color radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">پرداخت شده</span>;
}

export function FailedStatus() {
	return <span className="project-status status-failed radius-all-full px-2 py-2 button-text-color d-flex justify-content-center align-items-center txt-size-small font-weight-medium">پرداخت ناموفق</span>;
}