import { prisma } from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssue from "./components/EditIssue";
import IssueDetails from "./components/IssueDetails";
import { FC } from "react";
import UpdateProgress from "./components/UpdateProgress";

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
         <Grid columns={{ initial: "1", md: "2" }} gap="2">
            <Box>
               <IssueDetails issue={issue} />
            </Box>
            <Box>
               <EditIssue id={issue.id} />
               <UpdateProgress id={issue.id} status={issue.status} />
            </Box>
         </Grid>
      );
   }
};

export default page;
