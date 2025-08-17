import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoKanban from "../components/TodoKanban";
import AppLayout from "@components/templates/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div>
        <TodoForm channelId={"SampleChannelId"} />
        <TodoList />
        <TodoKanban />
      </div>
    </AppLayout>
  );
}
