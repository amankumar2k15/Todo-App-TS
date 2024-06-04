"use client"
import { useTodos } from "@/provider/TodoContext"
import { useState } from "react"


export const AddTodo: React.FC = () => {
    const [value, setValue] = useState("")
    const { handleAddTodo } = useTodos()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleAddTodo(value)
        setValue("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Write your todo"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">
                Add
            </button>
        </form>
    )
}
