import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/Service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId)
    return { title: `cabin ${name}` }
}
export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return ids;
}

export default async function Page({ params }) {
    const cabin = await getCabin(params.cabinId)


    return (
        <div className="max-w-7xl mx-auto mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="sm:text-5xl text-4xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner/>}>
                    <Reservations cabin={cabin}/>
                </Suspense>
                
            </div>
        </div>
    );
}