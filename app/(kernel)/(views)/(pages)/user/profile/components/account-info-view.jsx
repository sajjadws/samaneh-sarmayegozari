import { UserStatus } from "@/lib/prisma/prisma-enums";

export default function AccountInfoView({ user }) {
    const isActive = user.status === UserStatus.ACTIVE;
    console.log("user", user);

    return (
        <>
            <h2 className="txt-size-mid-title primary-color font-weight-bold">
                اطلاعات حساب
            </h2>

            <div className="d-flex flex-column gap-12">
                <div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
                    <span>تاریخ ثبت نام:</span>
                    <span>{utils.dateToString(user.createdAt)}</span>
                </div>

                <div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
                    <span>وضعیت حساب:</span>
                    <span
                        className={utils.cn(
                            "px-2 py-1 txt-size-small white-color radius-all-full",
                            isActive
                                ? "bg-success-regular-color"
                                : "bg-danger-regular-color"
                        )}
                    >
                        {isActive ? "فعال" : "غیرفعال"}
                    </span>
                </div>
            </div>
        </>
    );
}
