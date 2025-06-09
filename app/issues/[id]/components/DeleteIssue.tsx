"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DeleteIssue = ({ id }: { id: number }) => {
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
                  <Button color="red">Delete issue</Button>
               </AlertDialog.Action>
            </Flex>
         </AlertDialog.Content>
      </AlertDialog.Root>
   );
};

export default DeleteIssue;
