"use client";
import { FilterTypes } from "@/app/lib/types";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const status: FilterTypes[] = [
   { label: "All" },
   { label: "Open", value: "OPEN" },
   { label: "In Progress", value: "IN_PROGRESS" },
   { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
   const route = useRouter();
   return (
      <Select.Root
         onValueChange={(value) => {
            const query = value ? `?filterStatus=${value}` : "";
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
