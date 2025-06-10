import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssue = ({ id }: { id: number }) => {
   return (
      <Button>
         <Pencil2Icon />
         <Link
            href={`/issues/${id}`}
            className="flex flex-row gap-2 items-center"
         >
            Edit Issue
         </Link>
      </Button>
   );
};

export default EditIssue;
