import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/Service";

async function CabinsList() {
    const cabins = await getCabins();
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}

export default CabinsList