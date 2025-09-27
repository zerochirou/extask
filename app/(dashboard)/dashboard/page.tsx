import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "../_components/header";
import { AddTodo } from "../_components/add-todo";
import { TaskList } from "../_components/task-list";
import { Todo } from "@/types/todo";
import { fetchTodo, finsishedTodoCount } from "../_action/todo-action";
import { SiderbarNav } from "../_components/siderbar";

export default async function DashboardPage() {
  const supabase = supabaseServer();
  const userRes = await supabase.auth.getUser();
  const todoRes = await fetchTodo();
  const todoCount = await finsishedTodoCount();

  if (userRes.error || !userRes.data.user) redirect("/");

  return (
    <div>
      <div className="flex justify-end">
        <SiderbarNav
          totalCount={Number(todoRes?.length)}
          completedCount={Number(todoCount)}
        />
      </div>
      <Header
        totalCount={Number(todoRes?.length)}
        completedCount={Number(todoCount)}
      />
      <AddTodo />
      <section className="mt-4">
        <ul className="grid grid-cols-1 gap-4">
          {todoRes?.map((i: Todo) => {
            return (
              <TaskList
                key={i.id}
                id={i.id}
                task={i.task}
                deadline={i.deadline}
                isPriority={i.priority}
                status={i.status}
                description={i.description}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
