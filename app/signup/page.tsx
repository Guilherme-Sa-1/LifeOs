"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "@/lib/auth";

export async function createTransaction(formData: FormData) {
  const user = await getAuthUser();
  if (!user) throw new Error("Não autorizado");

  const amount = parseFloat(formData.get("amount") as string);
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const categoryName = formData.get("category") as string;

  // 1. Busca ou cria a conta vinculada APENAS a este usuário
  let account = await prisma.account.findFirst({
    where: { userId: user.id }
  });

  if (!account) {
    account = await prisma.account.create({
      data: { name: "Principal", userId: user.id, balance: 0 }
    });
  }

  // 2. Busca ou cria a categoria deste usuário
  let category = await prisma.category.findFirst({
    where: { name: categoryName, userId: user.id }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: categoryName, type, userId: user.id }
    });
  }

  // 3. Cria a transação e atualiza o saldo
  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        amount,
        description,
        type,
        accountId: account.id,
        categoryId: category.id,
      },
    }),
    prisma.account.update({
      where: { id: account.id },
      data: {
        balance: {
          increment: type === "INCOME" ? amount : -amount,
        },
      },
    }),
  ]);

  revalidatePath("/finance");
  revalidatePath("/");
}