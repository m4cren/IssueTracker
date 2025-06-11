import { Issue, Status } from "@/app/generated/prisma";
import IssueStatusBadge from "@/app/global_components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

const tableHeader: { label: string; value: keyof Issue; className?: string }[] =
   [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      {
         label: "Created At",
         value: "createdAt",
         className: "hidden md:table-cell",
      },
   ];

const IssuesTable = async ({
   searchParams,
}: {
   searchParams: { filterStatus: Status | "All"; orderBy: keyof Issue };
}) => {
   const issues = (
      await prisma.issue.findMany({
         orderBy: {
            [searchParams.orderBy]: "asc",
         },
      })
   ).toReversed();
   const orderBy = tableHeader
      .map(({ value }) => value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

   const queryObject = {
      filterStatus: searchParams.filterStatus,
      orderBy: searchParams.orderBy,
   };

   const filteredIssues =
      searchParams.filterStatus === "All"
         ? issues
         : searchParams.filterStatus
           ? issues.filter(({ status }) => status === searchParams.filterStatus)
           : issues;
   return (
      <Table.Root variant="surface">
         <Table.Header>
            <Table.Row>
               {tableHeader.map(({ label, value, className }) => (
                  <Table.ColumnHeaderCell key={value} className={className}>
                     <Link
                        href={{
                           query: {
                              ...queryObject,
                              orderBy: value,
                           },
                        }}
                     >
                        {label}
                     </Link>
                     {value === queryObject.orderBy && (
                        <ArrowDownIcon className="inline" />
                     )}
                  </Table.ColumnHeaderCell>
               ))}
            </Table.Row>
         </Table.Header>
         <Table.Body>
            {filteredIssues.map(({ id, title, status, createdAt }, index) => (
               <Table.Row key={index}>
                  <Table.Cell>
                     <Link
                        href={`/issues/edit/${id}`}
                        className="cursor-pointer hover:underline font-medium"
                     >
                        {title}
                     </Link>
                     <span className="block md:hidden">
                        <IssueStatusBadge status={status} />
                     </span>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                     <IssueStatusBadge status={status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                     {createdAt.toDateString()}
                  </Table.Cell>
               </Table.Row>
            ))}
         </Table.Body>
      </Table.Root>
   );
};

export default IssuesTable;
