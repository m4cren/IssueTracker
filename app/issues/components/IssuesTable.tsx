import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";

const IssuesTable = async () => {
   const issues = await prisma.issue.findMany();
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
            {issues.map(({ title, status, createdAt }, index) => (
               <Table.Row key={index}>
                  <Table.Cell>
                     {title}
                     <span className="block md:hidden">{status}</span>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                     {status}
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
