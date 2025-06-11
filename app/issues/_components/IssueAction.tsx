import { Button, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilter from "./IssueFilter";

const IssueAction = ({ isLoading }: { isLoading?: boolean }) => {
   return (
      <div className="flex flex-row items-center gap-4 justify-between">
         <IssueFilter />
         <Button disabled={isLoading}>
            {isLoading ? (
               <Spinner />
            ) : (
               <Link href="/issues/new">New Issue</Link>
            )}
         </Button>
      </div>
   );
};

export default IssueAction;
