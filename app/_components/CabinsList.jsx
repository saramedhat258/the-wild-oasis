import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/Service";
import { unstable_noStore as nostore } from "next/cache"

async function CabinsList({ filter }) {

    nostore()
    const cabins = await getCabins();
    let CabinsToDisplay;
    if (filter === 'all') CabinsToDisplay = cabins
    if (filter === 'small') CabinsToDisplay = cabins.filter(cab => cab.maxCapacity <= 3)
    if (filter === 'medium') CabinsToDisplay = cabins.filter(cab => cab.maxCapacity >= 4 && cab.maxCapacity <= 6)
    if (filter === 'large') CabinsToDisplay = cabins.filter(cab => cab.maxCapacity >= 7)
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {CabinsToDisplay.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}

export default CabinsList