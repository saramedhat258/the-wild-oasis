"use client";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../context/ReservationContext";

function isAlreadyBooked(range, datesArr) {
    return (
        range.from &&
        range.to &&
        datesArr.some((date) =>
            isWithinInterval(date, { start: range.from, end: range.to })
        )
    );
}

function DateSelector({ cabin, settings, bookedDates }) {
    const { range, resetRange, setRange } = useReservation()
    const { regularPrice, discount } = cabin


    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range
    const numNights = differenceInDays(displayRange?.to, displayRange?.from) || 0
    const cabinPrice = numNights * (regularPrice - discount);

    // SETTINGS
    const { minBookingLength, maxBookingLength } = settings;

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="place-self-center w-full rdp pt-12"
                mode="range"
                onSelect={setRange}
                selected={displayRange}
                min={minBookingLength + 1}
                max={maxBookingLength}
                fromMonth={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={2}
                disabled={(currDate) =>
                    isPast(currDate) ||
                    bookedDates.some(booked => isSameDay(booked, currDate))
                }
            />

            <div className="flex mt-[30px] items-center justify-between sm:px-8 px-2 bg-accent-500 text-primary-800 lg:h-[72px] h-[100px]">
                <div className="flex lg:flex-row flex-col lg:items-baseline lg:gap-6 ">
                    <p className="flex gap-2  items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">${regularPrice - discount}</span>
                                <span className="line-through font-semibold text-primary-700">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <>
                            <p className="bg-accent-600 lg:px-3 lg:py-2 max-lg:w-fit  text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p>
                                <span className="text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-2xl font-semibold">${cabinPrice}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range.from || range.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                        onClick={() => resetRange()}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;