import { AddTodo } from "@/components/AddTodo";
import { Navbar } from "@/components/Navbar";
import { TodoList } from "@/components/TodoList";
import { RiTodoLine } from "react-icons/ri";

export default function Home() {
  return (
    <main>
      <h2 className="flex flex-row items-center gap-4">
        <RiTodoLine className="icons" />
        TODO NEXT + TYPESCRIPT
        <RiTodoLine className="icons" />
      </h2>
      <Navbar />
      <AddTodo />
      <TodoList />
    </main>
  );
}
