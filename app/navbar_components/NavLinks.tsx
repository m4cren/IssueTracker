import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
   const currentPath = usePathname();
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
   return (
      <ul className="flex flex-row gap-8 items-center">
         {links.map(({ href, lbl }, index) => (
            <li key={index} className="list-none">
               {" "}
               <Link
                  href={href}
                  className={classNames({
                     "text-zinc-900 underline font-bold": currentPath === href,
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
   );
};

export default NavLinks;
