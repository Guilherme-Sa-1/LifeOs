"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "@/lib/auth";

export async function createTask(formData: FormData) {
  const user = await getAuthUser();
  if (!user) throw new Error("Não autorizado");

  const title = formData.get("title") as string;
  if (!title) throw new Error("O título da tarefa é obrigatório");

  // 1. Busca o primeiro projeto que pertence a alguma área deste usuário
  let project = await prisma.project.findFirst({
    where: {
      area: {
        userId: user.id,
      },
    },
  });

  // 2. Se o usuário for novo e não tiver projetos, cria uma área e um projeto padrão
  if (!project) {
    let area = await prisma.area.findFirst({ where: { userId: user.id } });
    
    if (!area) {
      area = await prisma.area.create({
        data: { name: "Geral", userId: user.id },
      });
    }

    project = await prisma.project.create({
      data: { name: "Projetos Gerais", areaId: area.id },
    });
  }

  // 3. Cria a tarefa vinculada ao projeto do usuário
  await prisma.task.create({
    data: {
      title,
      projectId: project.id,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/"); 
} // <--- Era essa a chave que estava faltando no seu código!

export async function toggleTask(id: string, currentStatus: boolean) {
  await prisma.task.update({
    where: { id },
    data: { isCompleted: !currentStatus },
  });
  revalidatePath("/tasks");
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath("/tasks");
  revalidatePath("/");
}