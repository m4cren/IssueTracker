import IssuesTable from "@/app/issues/_components/IssuesTable";

import IssueAction from "@/app/issues/_components/IssueAction";

const IssuesPage = async () => {
   return (
      <div className="flex flex-col gap-4">
         <IssueAction />
         <IssuesTable />
      </div>
   );
};

export default IssuesPage;
