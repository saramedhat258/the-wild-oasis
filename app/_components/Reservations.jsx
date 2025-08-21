import { auth } from "../_lib/auth"
import { getBookedDatesByCabinId, getSettings } from "../_lib/Service"
import DateSelector from "./DateSelector"
import LoginMessage from "./LoginMessage"
import ReservationForm from "./ReservationForm"

async function Reservations({ cabin }) {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
    ])
    const session = await auth()
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] xxl:gap-0 gap-10">
            <div className="xxl:col-span-1 col-span-2">
                <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
            </div>
            <div className="xxl:col-span-1 col-span-2">
                {session?.user ? (
                    <ReservationForm cabin={cabin} user={session.user} />
                ) : (
                    <LoginMessage />
                )}
            </div>
        </div>
    )
}

export default Reservations