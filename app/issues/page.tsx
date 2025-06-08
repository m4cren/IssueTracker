import IssuesTable from "./_components/IssuesTable";

import IssueAction from "./_components/IssueAction";

const IssuesPage = async () => {
   return (
      <div className="flex flex-col gap-4">
         <IssueAction />
         <IssuesTable />
      </div>
   );
};

export default IssuesPage;
