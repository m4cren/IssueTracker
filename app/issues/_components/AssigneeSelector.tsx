"use client";
import { Issue, User } from "@/app/generated/prisma";
import { Select, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const AssigneeSelector = ({ issue }: { issue: Issue }) => {
   const { data: users, error, isLoading } = useUsers();

   if (error) return null;

   if (isLoading) return <Spinner size={"2"} />;

   const handleChange = async (userId: string) => {
      try {
         await axios.patch(`/api/edit-issue/${issue.id}`, {
            assignToUserId: userId === "unassigned" ? null : userId || null,
         });
         toast(
            `Successfuly assigned to ${users?.find(({ id }) => id === userId)?.name}`,
         );
      } catch {
         toast("Could could not be saved");
      }
   };

   return (
      <>
         <Select.Root
            defaultValue={issue.assignToUserId || ""}
            onValueChange={(userId) => handleChange(userId)}
         >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
               <Select.Group>
                  <Select.Label>Suggestions</Select.Label>
                  <Select.Item value="unassigned">Unassigned</Select.Item>
                  {users?.map(({ name, id }) => (
                     <Select.Item
                        value={id}
                        key={id}
                        className="flex flex-row items-center py-2"
                     >
                        <p>{name}</p>
                     </Select.Item>
                  ))}
               </Select.Group>
            </Select.Content>
         </Select.Root>
         <Toaster />
      </>
   );
};

const useUsers = () =>
   useQuery<User[]>({
      queryKey: ["users"],
      queryFn: () => axios.get("/api/users").then((res) => res.data),
      staleTime: 60 * 100000,
      retry: 3,
   });

export default AssigneeSelector;
