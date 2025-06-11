import React from "react";
import { Status } from "./generated/prisma";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { DashboardDataTypes } from "./lib/types";

const IssueSummary = ({
   dataPackage: { closed, inProgress, open },
}: {
   dataPackage: DashboardDataTypes;
}) => {
   const data: { label: string; value: number; status: Status }[] = [
      {
         label: "Open issues",
         value: open,
         status: "OPEN",
      },
      {
         label: "In progress",
         value: inProgress,
         status: "IN_PROGRESS",
      },
      {
         label: "Closed issues",
         value: closed,
         status: "CLOSED",
      },
   ];
   return (
      <Flex gap={"2"}>
         {data.map(({ label, status, value }) => (
            <Card key={status}>
               <Flex direction={"column"} align={"center"}>
                  <Text size={"1"}>
                     <Link href={`/issues/list?filterStatus=${status}`}>
                        {label}
                     </Link>
                  </Text>
                  <Text size={"6"} weight={"bold"}>
                     {value}
                  </Text>
               </Flex>
            </Card>
         ))}
      </Flex>
   );
};

export default IssueSummary;
