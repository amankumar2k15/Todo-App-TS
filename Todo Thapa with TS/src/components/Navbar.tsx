"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export const Navbar = () => {
    const searchParams = useSearchParams();
    const todoFilter = searchParams.get("todo")

    return (
        <nav>
            <Link href="/" className={(todoFilter === null) ? "active" : ""}>All</Link>
            <Link href="/?todo=active" className={todoFilter === 'active' ? "active" : ""}>Active</Link>
            <Link href="/?todo=completed" className={todoFilter === 'completed' ? "active" : ""}>Completed</Link>
        </nav>
    )
}