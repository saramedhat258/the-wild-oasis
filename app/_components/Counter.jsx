"use client";

import { useState } from "react"
function Counter({ users }) {
    const [count, setcount] = useState(0)
    return (
        <>
            <p>we have {users.length} users</p>
            <button onClick={() => setcount(c => c + 1)}>{count}</button>
        </>
    )
}

export default Counter