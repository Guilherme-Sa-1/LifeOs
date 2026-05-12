"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTask } from "@/features/tasks/actions";

export function CreateTaskModal() {
  const [open, setOpen] = useState(false);

  async function actionWrapper(formData: FormData) {
    await createTask(formData);
    setOpen(false); // Fecha o modal após criar
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Adicione os detalhes da sua tarefa abaixo. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        
        <form action={actionWrapper} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" placeholder="Ex: Pagar conta de luz" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Input id="description" name="description" placeholder="Ex: Vencimento dia 10" />
          </div>
          <Button type="submit" className="mt-2">Salvar Tarefa</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}