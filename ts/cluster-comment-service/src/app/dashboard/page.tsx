import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import TodoKanban from "../../components/TodoKanban";

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <TodoForm />
      <TodoList />
      <TodoKanban />
    </div>
  );
}
