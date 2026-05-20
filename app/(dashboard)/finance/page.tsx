import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { CreateTransactionModal } from "@/features/finance/components/create-transaction-modal";
import { deleteTransaction } from "@/features/finance/actions";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/shared/delete-button";

export default async function FinancePage() {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  const accounts = await prisma.account.findMany({
    where: { userId: user.id }
  });

  const transactions = await prisma.transaction.findMany({
    where: { account: { userId: user.id } },
    orderBy: { date: "desc" },
    include: { category: true },
  });

  const totalBalance = accounts.reduce((acc: number, account: { balance: number }) => acc + account.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <CreateTransactionModal />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Últimas Transações</h2>
      <div className="grid gap-4">
        {/* BLINDAGEM AQUI: transaction: any */}
        {transactions.map((transaction: any) => {
          const deleteAction = deleteTransaction.bind(null, transaction.id);
          return (
            <Card key={transaction.id} className="flex flex-row items-center justify-between p-4 group">
              <div className="flex items-center gap-4">
                {transaction.type === "INCOME" ? (
                  <ArrowUpCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category.name} • {transaction.date.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`font-bold ${transaction.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>
                  {transaction.type === "INCOME" ? "+" : "-"} R$ {transaction.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <form action={deleteAction}>
                  <DeleteButton />
                </form>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}