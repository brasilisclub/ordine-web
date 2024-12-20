"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import OrdineActions from "@/actions/ordine";

export default function OrdineRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const successToast = () => {
    return toast({
      title: "Comanda criada com sucesso!",
      description: "Você será redirecionado para a lista de comandas.",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await OrdineActions.register(formData);

    successToast();
    router.push("/ordines");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="client_name">Nome do Cliente</Label>
        <Input
          id="client_name"
          name="client_name"
          type="text"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o nome do cliente"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="table">Número da Mesa</Label>
        <Input
          id="table"
          name="table"
          type="number"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o número da mesa"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Criando..." : "Criar"}
      </Button>
    </form>
  );
}
