import IssuesTable from "@/app/issues/_components/IssuesTable";

import IssueAction from "@/app/issues/_components/IssueAction";
import { SearchParamsTypes } from "@/app/lib/types";
import { Metadata } from "next";

const IssuesPage = async ({
   searchParams,
}: {
   searchParams: SearchParamsTypes;
}) => {
   return (
      <div className="flex flex-col gap-4 ">
         <IssueAction />
         <IssuesTable searchParams={searchParams} />
      </div>
   );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
   title: "Issue Tracker | Issues list",
   description: "View all project issues",
};
export default IssuesPage;
