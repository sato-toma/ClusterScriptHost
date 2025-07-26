import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
