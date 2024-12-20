"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthActions from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = (await AuthActions.signup(formData)) as ApiResponse;

    if (response?.status === 201) {
      toast({
        title: "Conta criada com sucesso",
        description: "Vamos te redirecionar para a tela de login",
      });
      router.push("/login");
    } else {
      toast({
        title: "Erro ao criar conta",
        description: "Usuário já existente no sistema",
        variant: "destructive",
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
        <h1 className="text-2xl">Crie a sua conta</h1>
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
          Cadastrar-se
        </Button>
      </div>
      <div className="text-center text-sm">
        Já possui uma conta? {""}
        <a href="/login" className="underline underline-offset-4">
          Entre aqui
        </a>
      </div>
    </form>
  );
}
