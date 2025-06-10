"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssue = ({ id }: { id: number }) => {
   const route = useRouter();
   const [isError, setError] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const handleDelete = async () => {
      setIsLoading(true);
      try {
         await axios.delete(`/api/delete-issue/${id}`);
         route.push("/issues/list");
         route.refresh();
      } catch (error) {
         console.log(error);
         setError(true);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <AlertDialog.Root>
            <AlertDialog.Trigger>
               <Button color="red" disabled={isLoading}>
                  {isLoading ? (
                     <Spinner />
                  ) : (
                     <>
                        <TrashIcon />
                        <p>Delete issue</p>
                     </>
                  )}
               </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
               <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
               <AlertDialog.Description>
                  Are you sure you want to delete this issue? This action is
                  irreversable!
               </AlertDialog.Description>
               <Flex gap={"2"} mt={"4"}>
                  <AlertDialog.Cancel>
                     <Button color="gray">Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                     <Button color="red" onClick={handleDelete}>
                        Delete issue
                     </Button>
                  </AlertDialog.Action>
               </Flex>
            </AlertDialog.Content>
         </AlertDialog.Root>
         <AlertDialog.Root open={isError}>
            <AlertDialog.Content>
               <AlertDialog.Title>Error</AlertDialog.Title>
               <AlertDialog.Description>
                  This issue could not be deleted.
               </AlertDialog.Description>
               <Button
                  variant="soft"
                  color="gray"
                  mt={"2"}
                  onClick={() => setError(false)}
               >
                  Accept
               </Button>
            </AlertDialog.Content>
         </AlertDialog.Root>
      </>
   );
};

export default DeleteIssue;
