function Card({ className, size = "default", ...props }) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={["card", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }) {
	return (
		<div
			data-slot="card-header"
			className={["card-header", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }) {
	return (
		<div
			data-slot="card-title"
			className={["card-title", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }) {
	return (
		<div
			data-slot="card-description"
			className={["card-description", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }) {
	return (
		<div
			data-slot="card-action"
			className={["card-action", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }) {
	return (
		<div
			data-slot="card-content"
			className={["card-content", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }) {
	return (
		<div
			data-slot="card-footer"
			className={["card-footer", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};