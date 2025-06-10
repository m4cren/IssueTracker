"use client";
import { Status } from "@/app/generated/prisma";
import { Button, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateProgress = ({ id, status }: { id: number; status: Status }) => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const handleUpdateStatus = async () => {
      setIsLoading(true);
      try {
         await axios.patch(`/api/${id}/update-issue-status`, {
            currentState: status,
         });
      } catch (error) {
         console.log(error);
      } finally {
         router.push("/issues/list");
         setIsLoading(false);
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
         disabled={status === "CLOSED" || isLoading}
      >
         {isLoading ? (
            <Spinner />
         ) : (
            <Text className="flex flex-row gap-2 items-center">
               {status === "OPEN"
                  ? "Mark as In Progress"
                  : status === "IN_PROGRESS"
                    ? "Close the Issue"
                    : "Completed"}
            </Text>
         )}
      </Button>
   );
};

export default UpdateProgress;
