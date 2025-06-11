"use client";
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationType = {
   itemCount: number;
   pageSize: number;
   currentPage: number;
};

const Pagination = ({ currentPage, itemCount, pageSize }: PaginationType) => {
   const pageCount = Math.ceil(itemCount / pageSize);
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleChangePage = (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push("?" + params.toString());
   };
   return (
      <Flex align={"center"} gap={"2"}>
         <Text size={"1"}>
            Page {currentPage} of {pageCount}
         </Text>
         <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => handleChangePage(1)}
         >
            <DoubleArrowLeftIcon />
         </Button>
         <Button
            color="gray"
            variant="soft"
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
         >
            <ChevronLeftIcon />
         </Button>
         <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => handleChangePage(currentPage + 1)}
         >
            <ChevronRightIcon />
         </Button>
         <Button
            color="gray"
            variant="soft"
            disabled={currentPage === pageCount}
            onClick={() => handleChangePage(pageCount)}
         >
            <DoubleArrowRightIcon />
         </Button>
      </Flex>
   );
};

export default Pagination;
