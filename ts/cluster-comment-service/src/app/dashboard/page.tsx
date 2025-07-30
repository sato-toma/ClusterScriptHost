import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import TodoKanban from "../../components/TodoKanban";

export default function Home() {
  return (
    <div>
      <TodoForm />
      <TodoList />
      <TodoKanban />
    </div>
  );
}
