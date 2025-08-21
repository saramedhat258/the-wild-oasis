"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const activeLink = searchParams.get("capacity") ?? "all"
    const HandleFilter = (filter) => {
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="border border-primary-800 flex">
            <Button
                filter="all"
                handleFilter={HandleFilter}
                activeLink={activeLink}
            >
                all cabins
            </Button>
            <Button
                filter="small"
                handleFilter={HandleFilter}
                activeLink={activeLink}
            >
                1-3 guests
            </Button>
            <Button
                filter="medium"
                handleFilter={HandleFilter}
                activeLink={activeLink}
            >
                4-6 guests
            </Button>
            <Button
                filter="large"
                handleFilter={HandleFilter}
                activeLink={activeLink}
            >
                7-10 guests
            </Button>
        </div>
    )
}

function Button({ filter, handleFilter, activeLink, children }) {
    return (
        <button
            className={`sm:px-5 p-2 hover:bg-primary-700 ${filter === activeLink ? "bg-primary-700 text-primary-50" : ""}`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    )


}

export default Filter