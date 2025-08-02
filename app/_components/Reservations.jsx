import { getBookedDatesByCabinId, getSettings } from "../_lib/Service"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"

async function Reservations({cabin}) {
    const [settings,bookedDates]=await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
    ])
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates}/>
            <ReservationForm cabin={cabin}/>
        </div>
    )
}

export default Reservations