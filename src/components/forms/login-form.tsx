"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthActions from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/api";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AuthActions.login(formData) as ApiResponse;

    if (response?.status === 200) {
      sessionStorage.setItem("token", response.body.token);
      router.push("/");
    } else {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha inválidos",
        variant: "destructive"
      });
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6 w-full max-w-xs", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <header>
        <h1 className="text-2xl">Entre na sua conta</h1>
      </header>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <Input
            name="username"
            type="username"
            placeholder="Usuário"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input name="password" type="password" placeholder="Senha" required />
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
