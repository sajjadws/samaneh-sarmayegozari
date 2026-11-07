"use client";

import { useMemo, useState } from "react";

import {
  DayPicker,
  getDateLib,
} from "react-day-picker/persian";

import { useDayPicker } from "react-day-picker";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

function PersianCalendar({
  className = "",
  showOutsideDays = true,
  showYearSwitcher = true,
  yearRange = 12,
  numberOfMonths = 1,
  ...props
}) {
  const dateLib = getDateLib();

  const [navView, setNavView] = useState("days");

  // محاسبه بازه سال‌ها بر اساس تقویم شمسی
  const [displayYears, setDisplayYears] = useState(() => {
    const currentYear = dateLib.getYear(dateLib.today());
    const from = currentYear - Math.floor((yearRange - 1) / 2);

    return {
      from,
      to: from + yearRange - 1,
    };
  });

  const {
    onNextClick,
    onPrevClick,
    startMonth,
    endMonth,
  } = props;

  const columnsDisplayed =
    navView === "years" ? 1 : numberOfMonths;

  const calendarClassNames = useMemo(
    () => ({
      months: "calendar-months",
      month_caption: "calendar-month-caption",
      weekdays: "calendar-weekdays",
      weekday: "calendar-weekday",
      month: "calendar-month",
      caption: "calendar-caption",
      caption_label: "calendar-caption-label",
      button_next:
        "calendar-nav-button calendar-next-button",
      button_previous:
        "calendar-nav-button calendar-previous-button",
      nav: "calendar-navigation",
      month_grid: "calendar-month-grid",
      week: "calendar-week",
      day: "calendar-day",
      day_button: "calendar-day-button",
      range_start: "calendar-range-start",
      range_middle: "calendar-range-middle",
      range_end: "calendar-range-end",
      selected: "calendar-selected",
      today: "calendar-today",
      outside: "calendar-outside",
      disabled: "calendar-disabled",
      hidden: "calendar-hidden",
    }),
    []
  );

  return (
    <DayPicker
      mode="single"
      numerals="arabext"
      timeZone="Asia/Tehran"
      weekStartsOn={6}
      showOutsideDays={showOutsideDays}
      className={`persian-calendar ${className}`}
      style={{
        width: `${248.8 * columnsDisplayed}px`,
      }}
      classNames={calendarClassNames}
      components={{
        Chevron: ({ orientation }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeftIcon
              : ChevronRightIcon;

          return <Icon className="calendar-chevron" />;
        },

        // دکمه‌های جابه‌جایی ماه و بازه سال
        Nav: ({ className: navClassName }) => {
          const {
            nextMonth,
            previousMonth,
            goToMonth,
          } = useDayPicker();

          const range =
            displayYears.to - displayYears.from + 1;

          const firstDayOfRange = dateLib.newDate(
            displayYears.from,
            0,
            1
          );

          const lastDayOfRange = dateLib.newDate(
            displayYears.to,
            11,
            31
          );

          const isPreviousDisabled =
            navView === "years"
              ? (
                  (startMonth &&
                    dateLib.isBefore(
                      lastDayOfRange,
                      startMonth
                    )) ||
                  (endMonth &&
                    dateLib.isAfter(
                      firstDayOfRange,
                      endMonth
                    ))
                )
              : !previousMonth;

          const isNextDisabled =
            navView === "years"
              ? (
                  (startMonth &&
                    dateLib.isBefore(
                      lastDayOfRange,
                      startMonth
                    )) ||
                  (endMonth &&
                    dateLib.isAfter(
                      firstDayOfRange,
                      endMonth
                    ))
                )
              : !nextMonth;

          const handlePreviousClick = () => {
            if (isPreviousDisabled) return;

            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from - range,
                to: prev.to - range,
              }));

              return;
            }

            goToMonth(previousMonth);
            onPrevClick?.(previousMonth);
          };

          const handleNextClick = () => {
            if (isNextDisabled) return;

            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from + range,
                to: prev.to + range,
              }));

              return;
            }

            goToMonth(nextMonth);
            onNextClick?.(nextMonth);
          };

          return (
            <nav
              className={`calendar-navigation ${
                navClassName || ""
              }`}
            >
              <button
                type="button"
                className="calendar-nav-button calendar-previous-button"
                disabled={isPreviousDisabled}
                aria-label="قبلی"
                onClick={handlePreviousClick}
              >
                <ChevronLeftIcon />
              </button>

              <button
                type="button"
                className="calendar-nav-button calendar-next-button"
                disabled={isNextDisabled}
                aria-label="بعدی"
                onClick={handleNextClick}
              >
                <ChevronRightIcon />
              </button>
            </nav>
          );
        },

        // عنوان ماه و انتخاب سال
        CaptionLabel: ({ children, ...captionProps }) => {
          if (!showYearSwitcher) {
            return (
              <span {...captionProps}>
                {children}
              </span>
            );
          }

          return (
            <button
              type="button"
              className="calendar-year-switcher"
              onClick={() => {
                setNavView((prev) =>
                  prev === "days" ? "years" : "days"
                );
              }}
            >
              {navView === "days"
                ? children
                : `${dateLib.formatNumber(
                    displayYears.from
                  )} - ${dateLib.formatNumber(
                    displayYears.to
                  )}`}
            </button>
          );
        },

        // نمایش لیست سال‌های شمسی
        MonthGrid: ({ className, children, ...gridProps }) => {
          const { goToMonth, selected } = useDayPicker();

          if (navView === "years") {
            const currentYear = dateLib.getYear(
              dateLib.today()
            );

            return (
              <div
                className={`calendar-year-grid ${
                  className || ""
                }`}
                {...gridProps}
              >
                {Array.from(
                  {
                    length:
                      displayYears.to -
                      displayYears.from +
                      1,
                  },
                  (_, index) => {
                    const year =
                      displayYears.from + index;

                    const yearStart = dateLib.newDate(
                      year,
                      0,
                      1
                    );

                    const yearEnd = dateLib.newDate(
                      year,
                      11,
                      31
                    );

                    const isBefore =
                      startMonth &&
                      dateLib.isBefore(
                        yearEnd,
                        startMonth
                      );

                    const isAfter =
                      endMonth &&
                      dateLib.isAfter(
                        yearStart,
                        endMonth
                      );

                    const isDisabled =
                      Boolean(isBefore || isAfter);

                    const isCurrentYear =
                      year === currentYear;

                    return (
                      <button
                        key={year}
                        type="button"
                        disabled={isDisabled}
                        className={`calendar-year-button ${
                          isCurrentYear
                            ? "calendar-current-year"
                            : ""
                        }`}
                        onClick={() => {
                          const baseDate =
                            selected instanceof Date
                              ? selected
                              : dateLib.today();

                          const month =
                            dateLib.getMonth(baseDate);

                          const targetDate =
                            dateLib.newDate(
                              year,
                              month,
                              1
                            );

                          goToMonth(targetDate);
                          setNavView("days");
                        }}
                      >
                        {dateLib.formatNumber(year)}
                      </button>
                    );
                  }
                )}
              </div>
            );
          }

          return (
            <table
              className={className}
              {...gridProps}
            >
              {children}
            </table>
          );
        },
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}

PersianCalendar.displayName = "PersianCalendar";

export { PersianCalendar as Calendar };