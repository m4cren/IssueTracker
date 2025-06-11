import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { DashboardDataTypes } from "./lib/types";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

const page = async () => {
   const openIssues = await prisma.issue.count({
      where: {
         status: "OPEN",
      },
   });
   const inProgressIssues = await prisma.issue.count({
      where: {
         status: "IN_PROGRESS",
      },
   });
   const closedIssues = await prisma.issue.count({
      where: {
         status: "CLOSED",
      },
   });
   const dataPackage: DashboardDataTypes = {
      open: openIssues,
      inProgress: inProgressIssues,
      closed: closedIssues,
   };
   return (
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
         <Flex direction={"column"} gap={"5"}>
            <IssueSummary dataPackage={dataPackage} />
            <IssueChart dataPackage={dataPackage} />
         </Flex>
         <LatestIssues />
      </Grid>
   );
};
export const metadata: Metadata = {
   title: "Issue Tracker | Dashboard",
   description: "View a summary of project issues",
};
export default page;
