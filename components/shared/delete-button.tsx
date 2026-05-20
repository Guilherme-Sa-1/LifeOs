"use client";

import { useFormStatus } from "react-dom";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        // Exibe um alerta de confirmação antes de enviar o formulário
        if (!window.confirm("Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.")) {
          e.preventDefault(); // Cancela a exclusão se o usuário clicar em "Cancelar"
        }
      }}
      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-2 disabled:opacity-100 disabled:text-destructive"
      title="Excluir"
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </button>
  );
}