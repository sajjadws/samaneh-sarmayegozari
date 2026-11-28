"use client"

import { useSearchParams } from "next/navigation";

export default function RowNumber({number}){
    const searchParams = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const perPage = +searchParams.get("perPage") || 10;
    // const rowNumber = total ? total - (number + (page - 1) * perPage) + 1 : number + (page - 1) * perPage;
    const rowNumber = ((number + (page - 1) * perPage) + 1);

    return (
        <span>{rowNumber}</span>
    );
}