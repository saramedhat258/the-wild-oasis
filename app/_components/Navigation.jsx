import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
    const session =await auth()
    console.log(session)
    return (
        <nav className="z-10 sm:text-xl text-sm">
            <ul className="flex md:gap-16 sm:gap-10 gap-3 items-center">
                <li>
                    <Link
                        href="/cabins"
                        className="hover:text-accent-400 transition-colors"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="hover:text-accent-400 transition-colors"
                    >
                        About
                    </Link>
                </li>
                <li>
                    {
                        session?.user?.image ?(
                            <Link
                                href="/account"
                                className="hover:text-accent-400 transition-colors flex items-center gap-4"
                            >
                                <img src={session.user.image} alt={session.user.name} className="h-8 rounded-full " referrerPolicy="no-referre" />
                                <span className="md:block hidden">Guest area</span>
                            </Link>
                        )
                            :(
                            <Link
                                href="/account"
                                className="hover:text-accent-400 transition-colors"
                            >
                                Guest area
                            </Link>
                            )
                    }

                </li>
            </ul>
        </nav>
    );
}
