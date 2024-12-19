"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthActions from "@/actions/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6 w-full max-w-xs", className)}
      {...props}
      action={AuthActions.login}
    >
      <header>
        <h1 className="text-2xl">Entre na sua conta</h1>
      </header>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <Input name="username" type="username" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Ainda não possui uma conta? {""}
        <a href="/signup" className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
