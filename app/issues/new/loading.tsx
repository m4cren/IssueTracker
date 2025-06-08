import { Skeleton } from "@/app/lib/modules";
import { Box, Button, Spinner } from "@radix-ui/themes";
const loading = async () => {
   return (
      <Box className="flex flex-col gap-4 w-[50vw]">
         <Skeleton />

         <Skeleton height={"30rem"} />

         <Button disabled={true}>
            <Spinner size={"3"} />
         </Button>
      </Box>
   );
};

export default loading;
