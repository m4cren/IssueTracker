"use client";
import { User } from "@/app/generated/prisma";
import { Select, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const AssigneeSelector = () => {
   const {
      data: users,
      error,
      isLoading,
   } = useQuery<User[]>({
      queryKey: ["users"],
      queryFn: () => axios.get("/api/users").then((res) => res.data),
      staleTime: 60 * 1000,
      retry: 3,
   });

   if (error) return null;

   if (isLoading) return <Spinner size={"2"} />;

   return (
      <Select.Root>
         <Select.Trigger placeholder="Assign..." />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               {users?.map(({ email, name, id }) => (
                  <Select.Item
                     value={id}
                     key={id}
                     className="flex flex-row items-center py-2"
                  >
                     <p>
                        {email} ({name})
                     </p>
                  </Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
};

export default AssigneeSelector;
