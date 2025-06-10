import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";

const Dropdown = ({ session }: { session: Session | null }) => {
   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger>
            <Avatar
               src={session?.user!.image!}
               fallback="?"
               radius="full"
               size={"3"}
               className="cursor-pointer shadow-md"
               referrerPolicy="no-referrer"
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
   );
};

export default Dropdown;
