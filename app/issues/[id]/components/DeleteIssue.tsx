"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssue = ({ id }: { id: number }) => {
   const route = useRouter();
   const handleDelete = async () => {
      try {
         await axios.delete(`/api/${id}/delete-issue`);
         route.push("/issues");
         route.refresh();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <AlertDialog.Root>
         <AlertDialog.Trigger>
            <Button color="red">
               <TrashIcon />
               Delete
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
   );
};

export default DeleteIssue;
