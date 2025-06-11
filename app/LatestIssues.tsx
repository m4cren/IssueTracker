import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./global_components/IssueStatusBadge";

const LatestIssues = async () => {
   const issues = await prisma.issue.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 5,
      include: {
         assignToUser: true,
      },
   });
   return (
      <Card>
         <Heading>Latest Issues</Heading>
         <Table.Root>
            <Table.Body>
               {issues.map(({ id, status, title, assignToUser }) => (
                  <Table.Row key={id}>
                     <Table.Cell>
                        <Flex justify={"between"}>
                           <Flex direction={"column"} gap={"1"} align={"start"}>
                              <Text>
                                 <Link href={`/issues/edit/${id}`}>
                                    {title}
                                 </Link>
                              </Text>
                              <IssueStatusBadge status={status} />
                           </Flex>

                           <Avatar
                              src={assignToUser?.image!}
                              fallback="?"
                              radius="full"
                           />
                        </Flex>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   );
};

export default LatestIssues;
