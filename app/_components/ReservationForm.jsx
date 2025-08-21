"use client";
import { differenceInDays } from "date-fns";
import { useReservation } from "../context/ReservationContext";
import { createBookingAction } from "../_lib/actions";
import { SubmitButton } from "./SubmitBtn";

function ReservationForm({ cabin, user }) {
    // CHANGE
    const { maxCapacity, id, discount, regularPrice } = cabin;
    const { range, resetRange } = useReservation()
    const startDate = range.from
    const endDate = range.to
    const numNights = differenceInDays(endDate, startDate)
    const cabinPrice = numNights * (regularPrice - discount)

    const BookingData = {
        startDate,
        endDate,
        cabinId: id,
        numNights,
        cabinPrice
    }
    const createBookingData = createBookingAction.bind(null, BookingData)
    return (
        <div className='scale-[1.01]'>
            <div className='bg-primary-800 text-primary-300 md:px-16 px-4 py-2 flex justify-between items-center'>
                <p>Logged in as</p>

                <div className='flex md:gap-4 gap-1 items-center'>
                    <img
                        // Important to display google profile images
                        referrerPolicy='no-referrer'
                        className='h-8 rounded-full'
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name.split(" ").at(0)}</p>
                </div>
            </div>

            <form
                action={async (formData) => {
                    await createBookingData(formData)
                    resetRange()
                }}
                className='bg-primary-900 py-10 md:px-16 px-4 text-lg flex gap-5 flex-col'>
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        className='sm:placeholder:text-sm sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        required
                    >
                        <option value='' key=''>
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? 'guest' : 'guests'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='observations'>
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name='observations'
                        id='observations'
                        className='sm:px-5 py-3 sm:placeholder:text-sm bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        placeholder='Any pets, allergies, special requirements, etc.?'
                    />
                </div>

                <div className='flex justify-end items-center gap-6'>
                    {!(startDate && endDate) ? (
                        <p className="text-primary-300 text-base lg:pb-8">
                            Start by selecting dates
                        </p>
                    ) : (
                        <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;