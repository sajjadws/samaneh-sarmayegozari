
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card/page";

import { Button } from "../button/page";

import {
  Progress,
  ProgressValue,
} from "../progress/page";

function SuccessfulProjectCard({
  image,
  status = "وضعیت طرح",
  title,
  description,

  targetAmount,
  raisedAmount,

  investorCount,
  minInvestment,
  maxInvestment,

  progress = 0,

  buttonText = "مشاهده جزئیات",
  onDetailsClick,
}) {
  return (
    <Card className="w-100 bw-1 border-primary-color border-style-solid">

      {/* تصویر و وضعیت پروژه */}
      <CardHeader>
        <div className="position-relative overflow-hidden radius-all-small aspect-ratio-2x1 w-100">

          <img
            src={image}
            alt={title}
            className="w-100 bw-1 border-style-solid border-color"
          />

          <span className="position-absolute top-0 inset-end-0">
            <i className="fa-solid fa-location-dot"></i>
            {status}
          </span>

        </div>
      </CardHeader>

      {/* عنوان و توضیحات */}
      <CardContent className="gap-2">

        <CardTitle className="txt-size-high-title">
          {title}
        </CardTitle>

        <CardDescription className="secondary-text-color">
          {description}
        </CardDescription>

      </CardContent>

      {/* مبالغ هدف و تامین شده */}
      <CardContent>

        <div className="d-flex justify-content-space-between py-6 px-4 on-primary-color radius-all-small">

          <div className="d-flex flex-column gap-1">
            <span>مبلغ هدف:</span>
            <span>{targetAmount}</span>
          </div>

          <div className="d-flex flex-column gap-1">
            <span>مبلغ تامین شده:</span>
            <span>{raisedAmount}</span>
          </div>

        </div>

      </CardContent>

      {/* تعداد سرمایه گذاران و محدوده سرمایه گذاری */}
      <CardContent>

        <div className="d-flex justify-content-space-between align-items-center">

          <div className="d-flex align-items-center gap-2">

            <i className="fa-solid fa-users"></i>

            <span>{investorCount}</span>

          </div>

          <div className="d-flex flex-column gap-1">

            <span>حداقل / حداکثر سرمایه گذاری:</span>

            <div>
              <span>{minInvestment}</span>
              <span> - </span>
              <span>{maxInvestment}</span>
            </div>

          </div>

        </div>

      </CardContent>

      {/* درصد پیشرفت */}
      <CardContent>

        <div className="d-flex align-items-center gap-2">

          <span>{progress}%</span>

          <Progress
            value={progress}
            className="w-100"
          />

        </div>

      </CardContent>

      {/* دکمه مشاهده جزئیات */}
      <CardFooter>

        <Button
          className="w-100 py-3 font-weight-medium txt-size-normal"
          onClick={onDetailsClick}
        >
          <i className="fa-solid fa-arrow-left"></i>
          {buttonText}
        </Button>

      </CardFooter>

    </Card>
  );
}

export default SuccessfulProjectCard;
