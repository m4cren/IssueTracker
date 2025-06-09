"use client";
import { Status } from "@/app/generated/prisma";
import { Button, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateProgress = ({ id, status }: { id: number; status: Status }) => {
   const router = useRouter();
   const handleUpdateStatus = async () => {
      try {
         await axios.patch(`/api/${id}/update-issue-status`, {
            currentState: status,
         });
      } catch (error) {
         console.log(error);
      } finally {
         router.push("/issues");
      }
   };
   return (
      <Button
         onClick={handleUpdateStatus}
         variant={
            status === "CLOSED"
               ? "ghost"
               : status === "IN_PROGRESS"
                 ? "classic"
                 : "soft"
         }
         disabled={status === "CLOSED"}
      >
         <Text className="flex flex-row gap-2 items-center">
            {status === "OPEN"
               ? "Mark as In Progress"
               : status === "IN_PROGRESS"
                 ? "Close the Issue"
                 : "Completed"}
         </Text>
      </Button>
   );
};

export default UpdateProgress;
