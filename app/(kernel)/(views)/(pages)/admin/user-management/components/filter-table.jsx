// "use client";

// import qs from "query-string";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/miz/themes/react/components/select/page";

// // const items = [
// // 	{ label: "ادمین", value: "ADMIN" },
// // 	{ label: "کاربر", value: "USER" },
// // 	{ label: "همه", value: null },
// // ];

// function normalizeItems(items) {
//     if (Array.isArray(items)) {
//         return items;
//     }

//     if (items && typeof items === "object") {
//         return Object.values(items).map((value) => ({
//             value,
//             label: value,
//         }));
//     }

//     return [];
// }

// export default function FilterTable({ items, queryName }) {
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     const normalizedItems = normalizeItems({{value: "", label: "همه"}, ...items});

//     const currentValue = searchParams.get(queryName) ?? "";

//     function pushQuery(value) {
//         const current = qs.parse(searchParams.toString());

//         const query = {
//             ...current,
//             page: 1,
//             [queryName]: value || null,
//         };

//         const url = qs.stringifyUrl(
//             {
//                 url: window.location.href,
//                 query,
//             },
//             {
//                 skipNull: true,
//             }
//         );

//         router.push(url);
//     }

//     return (
//         <Select
//             items={normalizedItems}
//             value={currentValue}
//             onValueChange={pushQuery}
//         >
//             <SelectTrigger className="w-100">
//                 <SelectValue placeholder="انتخاب کنید" />
//             </SelectTrigger>

//             <SelectContent>
//                 <SelectGroup>
//                     {normalizedItems.map((item) => (
//                         <SelectItem key={item.value} value={item.value}>
//                             {item.label}
//                         </SelectItem>
//                     ))}
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     );
// }






"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/miz/themes/react/components/select/page";

function normalizeItems(items) {
    let normalized = [];

    if (Array.isArray(items)) {
        normalized = items;
    } else if (items && typeof items === "object") {
        normalized = Object.entries(items).map(([key, value]) => ({
            value: key,
            label: value,
        }));
    }

    return [
        { label: "همه", value: "" },
        ...normalized,
    ];
}

export default function FilterTable({ items, queryName }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const normalizedItems = normalizeItems(items);
    const currentValue = searchParams.get(queryName) ?? "";

    function pushQuery(value) {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            page: 1,
            [queryName]: value || null,
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            {
                skipNull: true,
            }
        );

        router.push(url);
    }

    return (
        <Select
            items={normalizedItems}
            value={currentValue}
            onValueChange={pushQuery}
        >
            <SelectTrigger className="w-100">
                <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {normalizedItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
