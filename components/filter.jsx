"use client";

import qs from"query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/miz/themes/react";
import { useState } from "react";

export default function FilterTable({ item, queryTitle, options }) {
  const searchParams = useSearchParams();

  const router = useRouter();

  function pushQuery(filterQuery = null){
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      page: 1,
      [queryTitle]: filterQuery,
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, {
      skipNull: true
    });

    router.push(url);
  }

  const isValue = item?.options.some((option) => option.title === searchParams.get(queryTitle));

  return (
    <Select item={item} value={isValue ? (searchParams.get(queryTitle)) : ""} onValueChange={(filterQuery) => pushQuery(filterQuery)}>
      <SelectTrigger className="w-100 max-w-48">
        <SelectValue placeholder={item?.title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}