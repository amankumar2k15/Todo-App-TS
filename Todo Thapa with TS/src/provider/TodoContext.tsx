"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

interface Todo {
    id: string;
    todoTask: string;
    completed: boolean;
    createdAt: Date;
}

interface TodosContext {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    handleCheckTodo: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}


export const TodoContext = createContext<TodosContext | null>(null)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    // const [todos, setTodos] = useState<Todo[]>([])
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            try {
                setTodos(JSON.parse(storedTodos) as Todo[]);
            } catch (error) {
                console.error("Failed to parse todos from localStorage", error);
            }
        }
    }, []);
         
    console.log("todosss from context api=> ", todos)

    //Handle Add Todo
    const handleAddTodo = (task: string) => {
        setTodos((preValue) => {
            const newTodos: Todo[] = [{
                id: Math.random().toString(),
                todoTask: task,
                completed: false,
                createdAt: new Date,
            }, ...preValue]
            console.log("newTodos", newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }

    //Handle Check Todo
    const handleCheckTodo = (id: string) => {
        setTodos((preVal) => {
            const newTodos = preVal.map((task) => {
                if (task.id === id) {
                    return ({ ...task, completed: !task.completed })
                }
                return task
            })
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }

    //Handle Delete Todo
    const handleDeleteTodo = (id: string) => {
        setTodos((preVal) => {
            const newTodos = preVal.filter((task) => {
                return task.id !== id
            })
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }


    return (
        <TodoContext.Provider value={{ todos, handleCheckTodo, handleAddTodo, handleDeleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodos = () => {
    const todoContextValue = useContext(TodoContext)
    if (!todoContextValue) {
        throw new Error("useTodos used outside of the provider")
    }
    return todoContextValue;
}