// app/(dashboard)/tasks/page.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal"; // <-- Importe aqui

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
        {/* Adicione o componente do modal aqui */}
        <CreateTaskModal />
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">Você ainda não tem tarefas cadastradas.</p>
        ) : (
          tasks.map((task) => (
             /* ... restante do código do Card que já estava aqui ... */
            <Card key={task.id} className="flex flex-row items-center p-4">
              <button className="mr-4 text-muted-foreground hover:text-primary">
                {task.isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              <div>
                <CardTitle className="text-base font-medium">
                  {task.title}
                </CardTitle>
                <CardContent className="p-0 mt-1 flex gap-2 text-sm text-muted-foreground">
                  <span>{task.project?.name || "Sem projeto"}</span>
                  {task.dueDate && (
                    <span>• Vence em: {task.dueDate?.toLocaleDateString()}</span>
                  )}
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}