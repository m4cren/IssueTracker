import { Box, Button, Spinner } from "@radix-ui/themes";
import { Skeleton } from "@/app/lib/modules";

const IssueFormSkeleton = () => {
   return (
      <Box className="flex flex-col gap-4 w-[50vw]">
         <Skeleton height={"2.5rem"} />

         <Skeleton height={"30rem"} />

         <Button disabled={true}>
            <Spinner size={"3"} />
         </Button>
      </Box>
   );
};

export default IssueFormSkeleton;
