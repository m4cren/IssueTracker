import { Issue } from "@/app/generated/prisma";
import IssueStatusBadge from "@/app/global_components/IssueStatusBadge";
import Pagination from "@/app/global_components/Pagination";
import { PAGE_SIZE } from "@/app/lib/constants";
import { SearchParamsTypes } from "@/app/lib/types";
import { prisma } from "@/prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

const IssuesTable = async ({
   searchParams,
}: {
   searchParams: SearchParamsTypes;
}) => {
   const queryObject = {
      filterStatus: searchParams.filterStatus,
      orderBy: searchParams.orderBy,
      page: parseInt(searchParams.page) || 1,
   };

   const filterer =
      queryObject.filterStatus === "All"
         ? undefined
         : queryObject.filterStatus
           ? queryObject.filterStatus
           : undefined;
   const orderBy = tableHeader
      .map(({ value }) => value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

   const where = {
      status: filterer,
   };
   const issues = (
      await prisma.issue.findMany({
         where,
         orderBy,
         skip: (queryObject.page - 1) * PAGE_SIZE,
         take: PAGE_SIZE,
      })
   ).toReversed();

   const itemCount = await prisma.issue.count({
      where,
   });

   return (
      <>
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
         <Pagination
            currentPage={queryObject.page}
            itemCount={itemCount}
            pageSize={PAGE_SIZE}
         />
      </>
   );
};

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

export default IssuesTable;
