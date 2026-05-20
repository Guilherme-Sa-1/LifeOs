"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => logout()}
      className="text-muted-foreground hover:text-destructive"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  );
}