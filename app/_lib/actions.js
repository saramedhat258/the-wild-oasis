"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./Service";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", { redirectTo: '/account' })
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}

export async function updateProfileAction(formData) {
    const session = await auth()
    if (!session) throw new Error("you are not logged in")

    const nationalID = formData.get("nationalID")
    const [nationality, countryFlag] = formData.get("nationality").split("%")
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national ID");

    console.log("Nationality value:", formData.get("nationality"));

    const updatedData = { nationality, countryFlag, nationalID }
    const { error } = await supabase
        .from('guests')
        .update(updatedData)
        .eq('id', session.user.guestId)

    if (error) throw new Error('Guest could not be updated');

    revalidatePath("/account/profile");

}

export async function deletReservationAction(bookingId) {
    const session = await auth()
    if (!session)
        throw new Error("you are not logged in")

    /*بما ان ده كود باك ايند ف لازم اتأكد ان محدش يقدر يمسح حاجه او يضيف حاجه من البراوزر وهو مش يوزر او ده مش الاكونت بتاعه */
    const guestBookings = await getBookings(session.user.guestId)
    console.log(guestBookings)
    const bookingIDs = guestBookings.map((b) => b.id)
    console.log(bookingIDs)
    if (!bookingIDs.includes(bookingId))
        throw new Error("You are not allowed to delete this booking");
    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error)
        throw new Error('Booking could not be deleted');

    revalidatePath("/account/reservations")
}

export async function createBookingAction(bookingData, formData) {
    const session = await auth()
    if (!session)
        throw new Error("you are not logged in")
    const newBooking = {
        ...bookingData,
        guestId:session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations"),
        totalPrice:bookingData.cabinPrice,
        extrasPrice: 0,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed",
    }

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])

    if (error){
        console.log(error.message)
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect("/cabins/thankyou")


}

export async function updateBookingAction(formData) {
    const bookingId = Number(formData.get("bookingId"))

    /* autintication */
    const session = await auth()
    if (!session)
        throw new Error("you are not logged in")

    /* authorization */
    const guestBookings = await getBookings(session.user.guestId)
    const guestBookingIDs = guestBookings.map(booking => booking.id)
    if (!guestBookingIDs.includes(bookingId))
        throw new Error("you are not allowed to update this reservation")

    /* updated data */
    const updatededData = {
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 100)
    }

    const { error } = await supabase
        .from('bookings')
        .update(updatededData)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) throw new Error('Booking could not be updated');

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath(`/account/reservations`);
    redirect("/account/reservations")
}