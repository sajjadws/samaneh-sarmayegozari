"use client";

import { useRef } from "react";
import qs from "query-string";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup, InputGroup, InputGroupAddon, InputGroupInput } from "@/miz/themes/react";
import { useRouter, useSearchParams } from "next/navigation";

import { IconSearch } from "@tabler/icons-react";

import "@/lib/globals-client";

export default function SearchTable({ query, queryTitle }) {
  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: { search: query },
  });
  const router = useRouter();

  const timerRef = useRef(null);

  async function handelOnChange(searchQuery) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      pushQuery(searchQuery);
    }, 1500);
  }

  function pushQuery(searchQuery = null) {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      page: 1,
      [queryTitle]: searchQuery || null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  }

  return (
    <form id="form-rhf-input" onChange={() => handelOnChange}>
      <FieldGroup>
        <Controller
          name="search"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="max-w-96">
                <InputGroupInput
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handelOnChange(e.target.value);
                  }}
                  placeholder="جستجو"
                />
                <InputGroupAddon>
                  <IconSearch />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

// import { Search } from "lucide-react";

// import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
