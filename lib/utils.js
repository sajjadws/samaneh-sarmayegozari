

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
