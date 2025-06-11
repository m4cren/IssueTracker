"use client";
import { FilterTypes } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const status: FilterTypes[] = [
   { label: "All" },
   { label: "Open", value: "OPEN" },
   { label: "In Progress", value: "IN_PROGRESS" },
   { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
   const route = useRouter();
   const searchParams = useSearchParams();
   return (
      <Select.Root
         defaultValue={searchParams.get("filterStatus") || ""}
         onValueChange={(value) => {
            const params = new URLSearchParams();

            if (value) params.append("filterStatus", value);
            if (searchParams.get("orderBy")) {
               params.append("orderBy", searchParams.get("orderBy")!);
            }
            const query = params.size ? "?" + params.toString() : "";
            route.push(`/issues/list${query}`);
         }}
      >
         <Select.Trigger placeholder="Filter by" className="outline-none" />
         <Select.Group>
            <Select.Content>
               <Select.Label>Filter by</Select.Label>
               {status.map(({ label, value }, index) => (
                  <Select.Item value={value || "All"} key={index}>
                     {label}
                  </Select.Item>
               ))}
            </Select.Content>
         </Select.Group>
      </Select.Root>
   );
};

export default IssueFilter;
