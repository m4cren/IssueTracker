import { Button, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = ({ isLoading }: { isLoading?: boolean }) => {
   return (
      <div>
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
