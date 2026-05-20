import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "./actions";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">LifeOS</CardTitle>
          <CardDescription>
            Digite seu email e senha para acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            
            {params.error && (
              <p className="text-sm text-red-500">{params.error}</p>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
            
            {/* Link para a tela de Cadastro adicionado aqui */}
            <div className="text-center text-sm mt-2">
              Não tem uma conta? <Link href="/signup" className="underline hover:text-primary">Cadastre-se</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}