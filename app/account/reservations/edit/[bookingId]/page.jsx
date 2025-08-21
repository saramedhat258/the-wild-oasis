import { SubmitButton } from "@/app/_components/SubmitBtn";
import { updateBookingAction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/Service";

export default async function Page({ params }) {
    const { numGuests, observations, cabinId } = await getBooking(params?.bookingId);
    const { maxCapacity } = await getCabin(cabinId);

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{params?.bookingId}
            </h2>

            <form className="bg-primary-900 py-8 lg:px-12 px-2 text-lg flex gap-6 flex-col" action={updateBookingAction} >
                <input type="hidden" name="bookingId" value={params?.bookingId} />
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        key={numGuests}
                        defaultValue={numGuests}
                        className="lg:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        required
                    >
                        <option value="" >
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="observations"
                        defaultValue={observations}
                        className="lg:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    <SubmitButton pendingLabel={"Updating..."} >
                        Update reservation
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}