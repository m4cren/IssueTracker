import IssuesTable from "@/app/issues/_components/IssuesTable";

import IssueAction from "@/app/issues/_components/IssueAction";
import { Issue, Status } from "@/app/generated/prisma";

const IssuesPage = async ({
   searchParams,
}: {
   searchParams: { filterStatus: Status; orderBy: keyof Issue; page: string };
}) => {
   return (
      <div className="flex flex-col gap-4 ">
         <IssueAction />
         <IssuesTable searchParams={searchParams} />
      </div>
   );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
