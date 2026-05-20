"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createTask } from "@/features/tasks/actions";
import { SubmitButton } from "@/components/shared/submit-button";

export function CreateTaskModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Adicionar Tarefa</DialogTitle></DialogHeader>
        <form action={async (fd) => { await createTask(fd); setOpen(false); }} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Título</Label>
            <Input name="title" required />
          </div>
          <SubmitButton>Salvar</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}