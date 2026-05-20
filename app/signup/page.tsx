import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signUp } from "./action"; 
import Link from "next/link";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar seu LifeOS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" type="text" placeholder="Seu nome" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@exemplo.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            
            {params.error && (
              <p className="text-sm text-red-500">{params.error}</p>
            )}

            <Button type="submit" className="w-full">Cadastrar</Button>
            
            <div className="text-center text-sm mt-2">
              Já tem uma conta? <Link href="/login" className="underline hover:text-primary">Faça login</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}