import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import IssuesTable from "./components/IssuesTable";

const IssuesPage = () => {
   return (
      <div className="flex flex-col gap-4">
         <div>
            <Button>
               <Link href="/issues/new">New Issue</Link>
            </Button>
         </div>
         <IssuesTable />
      </div>
   );
};

export default IssuesPage;
