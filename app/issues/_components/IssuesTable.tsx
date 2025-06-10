import IssueStatusBadge from "@/app/global_components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

const IssuesTable = async () => {
   const issues = (await prisma.issue.findMany()).toReversed();
   return (
      <Table.Root variant="surface">
         <Table.Header>
            <Table.Row>
               <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
               <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Status
               </Table.ColumnHeaderCell>
               <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Created At
               </Table.ColumnHeaderCell>
            </Table.Row>
         </Table.Header>
         <Table.Body>
            {issues.map(({ id, title, status, createdAt }, index) => (
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
