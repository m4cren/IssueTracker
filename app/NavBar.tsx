"use client";
import { Button, Flex, Spinner } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import Dropdown from "./navbar_components/Dropdown";
import NavLinks from "./navbar_components/NavLinks";
const NavBar = () => {
   return (
      <nav className="flex flex-row gap-8 px-6 py-4 items-center border-b-1 border-[#2c2c2c35] ">
         <Link href={"/"}>
            <AiFillBug size={20} color="#2c2c2c" />
         </Link>
         <Flex justify={"between"} className=" w-full">
            <NavLinks />
            <AuthStatus />
         </Flex>
      </nav>
   );
};

export default NavBar;

const AuthStatus = () => {
   const { status, data: session } = useSession();

   if (status === "loading") {
      return <Spinner size={"3"} />;
   } else if (status === "unauthenticated") {
      return (
         <Link href={"/api/auth/signin"}>
            <Button color="blue" className="cursor-pointer">
               Login
            </Button>
         </Link>
      );
   } else {
      return <Dropdown session={session} />;
   }
};
