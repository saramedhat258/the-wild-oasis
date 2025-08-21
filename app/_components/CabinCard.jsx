import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

function CabinCard({ cabin }) {
    const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

    return (
        <div className="flex border-primary-800 border">
            <div className="max-md:w-24 md:flex-1 relative">
                <Image
                    
                    src={image}
                    alt={`Cabin ${name}`}
                    fill
                    className="border-r border-primary-800 object-cover"
                />
            </div>


            <div className="flex-grow">
                <div className="sm:pt-5 sm:pb-4 sm:px-7 p-2 bg-primary-950">
                    <h3 className="text-accent-500 font-semibold sm:text-2xl text-xl mb-3">
                        Cabin {name}
                    </h3>

                    <div className="flex sm:gap-3 gap-1 items-center mb-2">
                        <UsersIcon className="h-5 w-5 text-primary-600" />
                        <p className="sm:text-lg text-primary-200">
                            For up to <span className="font-bold">{maxCapacity}</span> guests
                        </p>
                    </div>

                    <p className="flex md:gap-3 gap-1 justify-end items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="sm:text-3xl text-xl font-[350]">
                                    ${regularPrice - discount}
                                </span>
                                <span className="line-through font-semibold text-primary-600">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="sm:text-3xl text-xl font-[350]">${regularPrice}</span>
                        )}
                        <span className="text-primary-200">/ night</span>
                    </p>
                </div>

                <div className="bg-primary-950 border-t border-t-primary-800 text-right">
                    <Link
                        href={`/cabins/${id}`}
                        className="border-l border-primary-800 md:py-4 py-2 md:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
                    >
                        Details & reservation &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CabinCard;