import { Issue } from "@/app/generated/prisma";
import IssueStatusBadge from "@/app/global_components/IssueStatusBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
const IssueDetails = ({
   issue: { status, title, createdAt, description },
}: {
   issue: Issue;
}) => {
   return (
      <>
         <Heading>{title}</Heading>
         <Flex className=" items-center" my={"2"} gap={"6"}>
            <Text>{createdAt.toDateString()}</Text>
            <IssueStatusBadge status={status} />
         </Flex>
         <Card className="prose max-w-full">
            <ReactMarkdown>{description}</ReactMarkdown>
         </Card>
      </>
   );
};

export default IssueDetails;
