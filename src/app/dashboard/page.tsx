import { fetchTask, finsishedTaskCount } from '@/action/task-action';
import { SiderbarNav } from './_components/sidebar';
import { Header } from './_components/header';
import { CreateTask } from './_components/create-task';
import { TaskCard } from './_components/task-card';
import { Task } from '@/types/task';

export default async function DashboardPage() {
  const finishedTaskCount = await finsishedTaskCount();
  const tasks = await fetchTask();
  return (
    <div>
      <div className="flex justify-end">
        <SiderbarNav
          totalCount={Number(tasks.data?.length)}
          completedCount={Number(finishedTaskCount)}
        />
      </div>
      <Header
        totalCount={Number(tasks.data?.length)}
        completedCount={Number(finishedTaskCount)}
      />
      <CreateTask />
      <section className="mt-4">
        <ul className="flex flex-col gap-4">
          {tasks.data?.map((task: Task) => {
            return (
              <TaskCard
                task={task.task}
                deadline={task.deadline}
                isPriority={task.priority}
                status={task.status}
                id={task.id}
                description={task.description}
                key={task.id}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
