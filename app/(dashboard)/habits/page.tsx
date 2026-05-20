import { prisma } from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { CreateHabitModal } from "@/features/habits/components/create-habit-modal";
import { deleteHabit, toggleHabitLog } from "@/features/habits/actions";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/shared/delete-button";

export default async function HabitsPage() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const today = new Date().toLocaleString("en-CA", { timeZone: "America/Sao_Paulo" }).split(",")[0];

  const [habits, areas] = await Promise.all([
    prisma.habit.findMany({
      where: { area: { userId: user.id } },
      orderBy: { createdAt: "desc" },
      include: { area: true, logs: { where: { date: today } } },
    }),
    prisma.area.findMany({
      where: { userId: user.id }
    })
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hábitos</h1>
        <CreateHabitModal areas={areas} />
      </div>

      <div className="grid gap-4">
        {habits.length === 0 ? (
          <p className="text-muted-foreground italic">Você ainda não tem hábitos cadastrados.</p>
        ) : (
          habits.map((habit: any) => {
            const isCompletedToday = habit.logs.length > 0;
            const toggleAction = toggleHabitLog.bind(null, habit.id, today);
            const deleteAction = deleteHabit.bind(null, habit.id);

            return (
              <Card key={habit.id} className="flex flex-row items-center justify-between p-4 group hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <form action={toggleAction}>
                    <button type="submit" className="mr-2 text-muted-foreground hover:text-primary">
                      {isCompletedToday ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </button>
                  </form>
                  <div>
                    <CardTitle className={`text-base font-medium ${isCompletedToday ? 'line-through text-muted-foreground' : ''}`}>
                      {habit.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{habit.area.name}</p>
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