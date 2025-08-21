import { auth } from "../_lib/auth"

export const metadata={
    title:'Account'
}
async function page() {
    const session=await auth()
    return (
        <h2 className="font-semibold md:text-2xl text-xl text-accent-400 mb-7">
                Welcome, { session?.user?.name.split(" ").at(0)}!
        </h2>
    )
}

export default page