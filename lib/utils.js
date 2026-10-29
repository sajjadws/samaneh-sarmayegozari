import { toGregorian, toJalaali, isValidJalaaliDate } from "jalaali-js";

export { cn } from "cn";

export function dateToString(date, format = "date") {
	const options = {
		date: {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		},
		time: {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		},
		hourMinute: {
			hour: "2-digit",
			minute: "2-digit",
		},
	};

	const validDate = date instanceof Date ? date : new Date(date);

	if (isNaN(validDate.getTime())) return "";

	switch (format) {
		case "date":
			return validDate.toLocaleDateString("fa-IR", options.date);

		case "time":
			return validDate.toLocaleTimeString("fa-IR", options.time);

		case "hourMinute":
			return validDate.toLocaleTimeString("fa-IR", options.hourMinute);

		case "dateTime":
		default:
			return validDate.toLocaleString("fa-IR", {
				...options.date,
				...options.hourMinute,
			});
	}
}

export function stringToDate(dateString) {
	const match = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

	if (!match) {
		throw new Error("فرمت تاریخ باید مثل 1405/08/04 باشد");
	}

	const [, year, month, day] = match.map(Number);

	if (!isValidJalaaliDate(year, month, day)) {
		throw new Error("تاریخ شمسی نامعتبر است");
	}

	const { gy, gm, gd } = toGregorian(year, month, day);

	return new Date(gy, gm - 1, gd);
}

export function jalaliToGregorian(dateString) {
	const match = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

	if (!match) {
		throw new Error("فرمت تاریخ شمسی باید مثل 1405/08/04 باشد");
	}

	const [, year, month, day] = match.map(Number);

	if (!isValidJalaaliDate(year, month, day)) {
		throw new Error("تاریخ شمسی نامعتبر است");
	}

	const { gy, gm, gd } = toGregorian(year, month, day);

	return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}

export function gregorianToJalali(dateString) {
	const match = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

	if (!match) {
		throw new Error("فرمت تاریخ میلادی باید مثل 2026-10-26 باشد");
	}

	const [, year, month, day] = match.map(Number);
	const date = new Date(Date.UTC(year, month - 1, day));

	if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
		throw new Error("تاریخ میلادی نامعتبر است");
	}

	const { jy, jm, jd } = toJalaali(year, month, day);

	return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}

export function persianNumber(number) {
	return number.toLocaleString("fa-IR");
}
