import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, FC } from "react";
import AssigneeSelector from "../../_components/AssigneeSelector";
import DeleteIssue from "../components/DeleteIssue";
import EditIssue from "../components/EditIssue";
import IssueDetails from "../components/IssueDetails";
import UpdateProgress from "../components/UpdateProgress";

const fetchUser = cache((issueId: number) => {
   return prisma.issue.findUnique({
      where: {
         id: issueId,
      },
   });
});

const page: FC<{ params: { id: string } }> = async (props) => {
   const issue = await fetchUser(parseInt(props.params.id));

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
                  <AssigneeSelector issue={issue} />
                  <EditIssue id={issue.id} />
                  <DeleteIssue id={issue.id} />
                  <UpdateProgress id={issue.id} status={issue.status} />
               </Flex>
            </Box>
         </Grid>
      );
   }
};
export async function generateMetadata({
   params,
}: {
   params: { id: string };
}): Promise<Metadata> {
   const issue = await fetchUser(parseInt(params.id));

   return {
      title: issue?.title,
      description: issue?.description,
   };
}
export default page;
