"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard"
import { deletReservationAction } from "../_lib/actions";

function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] =
        useOptimistic(
            bookings,
            (curBooking, bookingId) => {
                return curBooking.filter(book => book.id !== bookingId)
            }
        )
    async function handleDelete(bookingId) {
        optimisticDelete(bookingId)
        await deletReservationAction(bookingId)
    }
    return (
        <div>
            {optimisticBookings.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
            ))}
        </div>
    )
}

export default ReservationList