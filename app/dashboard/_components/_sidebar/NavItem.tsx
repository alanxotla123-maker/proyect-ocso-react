"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface INavItemProps {
    icon: ReactNode;
    path: string;
}

const NavItem = ({ icon, path }: INavItemProps) => {
    const pathname = usePathname();
    return (
        <Link href={path} className="w-full flex justify-center">
            <span className={`w-10/12 flex justify-center py-3 transition-colors ${pathname === path ? "bg-orange-400 rounded-xl" : ""}`}>
                {icon}
            </span>
        </Link>
    )
}
export default NavItem;