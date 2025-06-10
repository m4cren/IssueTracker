"use client";
import { User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const AssigneeSelector = () => {
   const [users, setUsers] = useState<User[] | null>(null);
   const fetchUsers = async () => {
      try {
         const { data } = await axios.get<User[]>("/api/users");
         if (data) {
            setUsers(data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);
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
