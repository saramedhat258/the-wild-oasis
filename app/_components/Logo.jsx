import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"
function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10 h-12 ">
            {/* <Image 
            src="/logo.png" 
            height="60" width="60" 
            alt="The Wild Oasis logo" 
            /> */}
            <div className="relative sm:h-16 sm:w-16 h-11 w-11">
                <Image
                    src={logo}
                    fill
                    className="object-cover"
                    alt="The Wild Oasis logo"
                    quality={100}
                />
            </div>

            <span className="text-xl font-semibold md:block hidden">
                The Wild Oasis
            </span>
        </Link>
    );
}

export default Logo;