"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { Avatar, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";
const NavBar = () => {
   const { status, data: session } = useSession();
   console.log(status, session);
   const links = [
      {
         href: "/",
         lbl: "Dashboard",
      },
      {
         href: "/issues/list",
         lbl: "Issues",
      },
   ];
   const currentPath = usePathname();
   return (
      <nav className="flex flex-row gap-8 px-6 py-4 items-center border-b-1 border-[#2c2c2c35] ">
         <Link href={"/"}>
            <AiFillBug size={20} color="#2c2c2c" />
         </Link>
         <Flex justify={"between"} className=" w-full">
            <ul className="flex flex-row gap-8 items-center">
               {links.map(({ href, lbl }, index) => (
                  <li key={index} className="list-none">
                     {" "}
                     <Link
                        href={href}
                        className={classnames({
                           "text-zinc-900 underline font-bold":
                              currentPath === href,
                           "text-zinc-500": currentPath !== href,
                           "font-medium hover:text-zinc-700 transition duration-200":
                              true,
                        })}
                     >
                        {lbl}
                     </Link>
                  </li>
               ))}
            </ul>
            {status === "unauthenticated" ? (
               <Link href={"/api/auth/signin"}>Login</Link>
            ) : (
               <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                     <Avatar
                        src={session?.user!.image!}
                        fallback="?"
                        radius="full"
                        size={"2"}
                        className="cursor-pointer"
                     />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                     <DropdownMenu.Label>
                        <Text>{session?.user!.email}</Text>
                     </DropdownMenu.Label>
                     <DropdownMenu.Item>
                        <Link
                           href={"/api/auth/signout"}
                           className="flex flex-row items-center gap-2 "
                        >
                           <ExitIcon /> Logout
                        </Link>
                     </DropdownMenu.Item>
                  </DropdownMenu.Content>
               </DropdownMenu.Root>
            )}
         </Flex>
      </nav>
   );
};

export default NavBar;
