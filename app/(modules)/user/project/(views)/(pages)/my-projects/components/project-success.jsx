
"use client";

import Link from "next/link";
import "../project-success.scss";

export default function ProjectSuccess({
  project,
  onViewDetails,
  onDashboard,
}) {
  const title = project?.title || "طرح سرمایه‌گذاری شما";
 

  return (
    <div className="project-success-overlay" dir="rtl">

      <div className="project-success-container">

        {/* آیکون موفقیت */}
        <div className="success-icon-wrapper">
          <div className="success-icon-inner">
            <svg
              width="90"
              height="90"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#123F3A"
                strokeWidth="6"
              />

              <path
                d="M31 51L44 64L70 38"
                stroke="#123F3A"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* عنوان موفقیت */}
        <div className="success-heading">
          <h1>
            طرح شما با موفقیت ثبت شد!
          </h1>

          <p>
            اطلاعات و مدارک طرح شما ثبت شده و برای بررسی به تیم
            کارشناسی ارسال شده است.
          </p>
        </div>

        {/* کارت اطلاعات طرح */}
        <div className="success-info-card">

          <div className="success-info-row">
            <span>عنوان طرح</span>

            <strong>{title}</strong>
          </div>

          <div className="success-info-row">
            <span>وضعیت طرح</span>

            <strong>در حال بررسی</strong>
          </div>

          {/* مشاهده جزئیات */}
          {onViewDetails ? (
            <button
              type="button"
              className="success-primary-button"
              onClick={onViewDetails}
            >
              مشاهده جزئیات طرح
            </button>
          ) : (
            <Link
              href="/userdashboard/projects/my-projects"
              className="success-primary-button"
            >
              مشاهده جزئیات طرح
            </Link>
          )}

          {/* بازگشت به پنل */}
          {onDashboard ? (
            <button
              type="button"
              className="success-secondary-button"
              onClick={onDashboard}
            >
              بازگشت به پنل کاربری
            </button>
          ) : (
            <Link
              href="/userdashboard"
              className="success-secondary-button"
            >
              بازگشت به پنل کاربری
            </Link>
          )}

        </div>

      </div>
    </div>
  );
}
