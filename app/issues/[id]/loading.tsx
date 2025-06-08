import { Skeleton } from "@/app/lib/modules";
import { Card, Flex } from "@radix-ui/themes";
const loading = async () => {
   return (
      <div className="flex flex-col gap-4 m-8 md:max-w-[55vw]">
         <Skeleton />
         <Flex className="items-center gap-4">
            <Skeleton width={"8rem"} />
            <Skeleton width={"5rem"} />
         </Flex>
         <Card className="prose">
            <Skeleton count={5} />
         </Card>
      </div>
   );
};

export default loading;
