"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
const NavBar = () => {
   const links = [
      {
         href: "/",
         lbl: "Dashboard",
      },
      {
         href: "/issues",
         lbl: "Issues",
      },
   ];
   const currentPath = usePathname();
   return (
      <nav className="flex flex-row gap-8 px-6 py-4 items-center border-b-1 border-[#2c2c2c35]">
         <Link href={"/"}>
            <AiFillBug size={20} color="#2c2c2c" />
         </Link>
         <ul className="flex flex-row gap-8">
            {links.map(({ href, lbl }, index) => (
               <Link
                  href={href}
                  key={index}
                  className={classnames({
                     "text-zinc-900 underline font-bold": currentPath === href,
                     "text-zinc-500": currentPath !== href,
                     "font-medium hover:text-zinc-700 transition duration-200":
                        true,
                  })}
               >
                  {lbl}
               </Link>
            ))}
         </ul>
      </nav>
   );
};

export default NavBar;
