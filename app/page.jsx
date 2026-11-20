// "use client";

// // import { authClient } from "@/lib/authentication/auth-client";
// // import { routes } from "@/lib/routes/routes";
// import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/miz/themes/react/components/avatar/page";
// import { Button } from "@/miz/themes/react/components/button/page";
// import { useRouter } from "next/navigation";

// export default async function HomePage() {
// 	const router = useRouter();

// 	async function logOut() {
// 		const { error } = await authClient.signOut({
// 			fetchOptions: {
// 				onSuccess: () => {
// 					router.replace(routes.user.login);
// 					router.refresh();
// 				},
// 			},
// 		});

// 		if (error) {
// 			console.error("خطا هنگام خروج:", error);
// 		}
// 	}

// 	return (
// 		<>
// 			<h1>home page</h1>
// 			<Button onClick={logOut} className="button button-login">
// 				خروج
// 			</Button>
// 		</>
// 	);
// }

// import { Input } from "@/miz/themes/react/components/input/page";
// // import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder";

// export default function InputDemo() {
//     return (
//         <div className="d-flex flex-column gap-4">
//             <Input placeholder="نام خود را وارد کنید" />

//             <Input
//                 size="sm"
//                 placeholder="ورودی کوچک"
//             />

//             <Input
//                 size="lg"
//                 placeholder="ورودی بزرگ"
//             />

//             <Input
//                 type="email"
//                 placeholder="ایمیل"
//                 startIcon={<i className="icon icon-24-support"></i>}
//             />

//             <Input
//                 placeholder="جستجو..."
//                 startIcon={<i className="icon icon-24-support"></i>}
//             />

//             <Input
//                 placeholder="ورودی نامعتبر"
//                 invalid
//             />

//             <Input
//                 placeholder="ورودی غیرفعال"
//                 disabled
//             />

//             <Input
//                 type="file"
//             />
//         </div>
//     );
// }

import { routes } from "@/lib/routes/routes";
import { Button } from "@/miz/themes/react/components/button/page";
import Link from "next/link";

export default function HomePage() {
	return (
		<>
			<Link href={routes.admin.login}>
				<Button>admin login</Button>
			</Link>
			<Link href={routes.user.login}>
				<Button>user login</Button>
			</Link>
		</>
	);
}
