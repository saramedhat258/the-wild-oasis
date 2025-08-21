
import Image from "next/image"
import { updateProfileAction } from "../_lib/actions";
import { SubmitButton } from "./SubmitBtn";

function UpdateProfileForm({ children, guest }) {

    return (
        <form className="bg-primary-900 py-8 lg:px-12 px-2 text-lg flex gap-6 flex-col" action={updateProfileAction}>
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    defaultValue={guest.fullName}
                    name="fullName"
                    disabled
                    className="lg:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    defaultValue={guest.email}
                    name="email"
                    disabled
                    className="lg:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <Image
                        src={guest.countryFlag}
                        alt="Country flag"
                        width={30}
                        height={20}
                        className="h-5 rounded-sm"
                    />
                </div>

                {children}
            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    defaultValue={guest.nationalID}
                    name="nationalID"
                    className="lg:px-5 px-2 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton pendingLabel={'Updating...'}  >
                    Update Profile
                </SubmitButton>
            </div>

        </form>
    )
}

export default UpdateProfileForm