"use client"
import { useTodos } from "@/provider/TodoContext"
import { useSearchParams } from "next/navigation";


export const TodoList = () => {
    const { todos, handleCheckTodo, handleDeleteTodo } = useTodos()
    const searchParams = useSearchParams();
    const todoFilter = searchParams.get("todo")

    // console.log(todoFilter)

    let filterTodos = todos;


    if (todoFilter === "active") {
        filterTodos = todos.filter((item) => !item.completed)
    }
    if (todoFilter === "completed") {
        filterTodos = todos.filter((item) => item.completed)
    }



    return (
        <ul className="main-task">
            {filterTodos?.map((item) => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" checked={item.completed}
                            id={`todo-${item.id}`}
                            onChange={() => handleCheckTodo(item.id)}
                        />
                        <label htmlFor={`todo-${item.id}`}>
                            {item.todoTask}
                        </label>

                        {
                            item.completed && (
                                <button type="button"
                                    onClick={() => handleDeleteTodo(item.id)}
                                >
                                    Delete
                                </button>
                            )
                        }
                    </li>
                )
            })}
        </ul>
    )
}