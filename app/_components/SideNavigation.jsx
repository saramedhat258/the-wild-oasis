"use client";
import Link from "next/link";
import {
    CalendarDaysIcon,
    HomeIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
    {
        name: "Home",
        href: "/account",
        icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "Reservations",
        href: "/account/reservations",
        icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
    },
    {
        name: "Guest profile",
        href: "/account/profile",
        icon: <UserIcon className="h-5 w-5 text-primary-600" />,
    },
];

function SideNavigation() {
    const pathname = usePathname()
    return (
        <nav className="border-r pr-10 border-primary-900">
            <ul className="flex flex-col gap-2 h-full text-lg">
                {navLinks.map((link) => (
                    <li key={link.name} className="max-md:w-fit">
                        <Link
                            className={`${pathname === link.href ? 'bg-primary-900' : ''} py-3 lg:px-5 hover:bg-primary-900  hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                            href={link.href}
                        >
                            {link.icon}
                            <span className="lg:block hidden">{link.name}</span>
                        </Link>
                    </li>
                ))}

                <li className="mt-auto max-md:w-fit">
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}

export default SideNavigation;