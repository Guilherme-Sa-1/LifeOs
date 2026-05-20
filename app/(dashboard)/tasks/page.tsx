import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { toggleTask, deleteTask } from "@/features/tasks/actions";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/shared/delete-button";

export default async function TasksPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const tasks = await prisma.task.findMany({
    where: { project: { area: { userId: user.id } } },
    orderBy: { createdAt: "desc" },
    include: { project: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
        <CreateTaskModal />
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground italic">Você ainda não tem tarefas cadastradas.</p>
        ) : (
          tasks.map((task: any) => {
            const toggleAction = toggleTask.bind(null, task.id, task.isCompleted);
            const deleteAction = deleteTask.bind(null, task.id);

            return (
              <Card key={task.id} className="flex flex-row items-center p-4 justify-between group hover:shadow-sm transition-shadow">
                <div className="flex items-center">
                  <form action={toggleAction}>
                    <button type="submit" className="mr-4 text-muted-foreground hover:text-primary">
                      {task.isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </button>
                  </form>
                  <div>
                    <CardTitle className={`text-base font-medium ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </CardTitle>
                    <CardContent className="p-0 mt-1 flex gap-2 text-sm text-muted-foreground">
                      <span>{task.project?.name || "Sem projeto"}</span>
                      {task.dueDate && (
                        <span>• Vence em: {task.dueDate.toLocaleDateString("pt-BR")}</span>
                      )}
                    </CardContent>
                  </div>
                </div>

                <form action={deleteAction}>
                  <DeleteButton />
                </form>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}