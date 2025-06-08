import { Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/lib/modules";
import IssueAction from "./_components/IssueAction";

const LoadingSkeleton = () => {
   const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   return (
      <div className="flex flex-col gap-4">
         <IssueAction isLoading={true} />
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
               {skeleton.map((item) => (
                  <Table.Row key={item}>
                     <Table.Cell>
                        <Skeleton />
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell">
                        <Skeleton />
                     </Table.Cell>
                     <Table.Cell className="hidden md:table-cell">
                        <Skeleton />
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </div>
   );
};

export default LoadingSkeleton;
