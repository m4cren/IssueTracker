import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssue from "./components/EditIssue";
import IssueDetails from "./components/IssueDetails";
import { FC } from "react";
import UpdateProgress from "./components/UpdateProgress";
import DeleteIssue from "./components/DeleteIssue";

const page: FC<{ params: { id: string } }> = async (props) => {
   const issue = await prisma.issue.findUnique({
      where: {
         id: parseInt(props.params.id),
      },
   });

   if (!issue) {
      notFound();
   } else {
      return (
         <Grid columns={{ initial: "1", md: "4" }} gap="2">
            <Box className="md:col-span-3">
               <IssueDetails issue={issue} />
            </Box>
            <Box>
               <Flex direction={"column"} gap={"2"}>
                  <EditIssue id={issue.id} />
                  <DeleteIssue id={issue.id} />
                  <UpdateProgress id={issue.id} status={issue.status} />
               </Flex>
            </Box>
         </Grid>
      );
   }
};

export default page;
