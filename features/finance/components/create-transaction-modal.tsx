"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createTransaction } from "@/features/finance/actions";
import { SubmitButton } from "@/components/shared/submit-button";

export function CreateTransactionModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Nova Transação</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Adicionar Transação</DialogTitle></DialogHeader>
        <form action={async (fd) => { await createTransaction(fd); setOpen(false); }} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Descrição</Label>
            <Input name="description" required />
          </div>
          <div className="grid gap-2">
            <Label>Valor</Label>
            <Input name="amount" type="number" step="0.01" required />
          </div>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <select name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Input name="category" required />
          </div>
          <SubmitButton>Salvar</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}