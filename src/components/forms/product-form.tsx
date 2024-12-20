"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ProductActions from "@/actions/product";
import { Product } from "@/types/app";

export function ProductRegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await ProductActions.register(formData);

    toast({
      title: "Produto criado com sucesso!",
      description: "Você será redirecionado para a lista de produtos.",
    });

    router.push("/ordines");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o nome do produto"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          type="text"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a descrição do produto"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          name="category"
          type="text"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a categoria do produto"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          name="price"
          type="number"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o preço do produto"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Estoque</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a quantidade em estoque do produto"
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

export function ProductUpdateForm({ productId }: { productId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        const productData = await ProductActions.getById(productId);
        setProduct(productData);
      }
    }
    fetchProduct();
  }, [productId, toast, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await ProductActions.update(formData, productId as string);
    toast({
      title: "Produto atualizado com sucesso!",
      description: "Você será redirecionado para a lista de produtos.",
    });
    router.push("/ordines");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o nome do produto"
          defaultValue={product.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          type="text"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a descrição do produto"
          defaultValue={product.description}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Input
          id="category"
          name="category"
          type="text"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a categoria do produto"
          defaultValue={product.category}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          name="price"
          type="number"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite o preço do produto"
          defaultValue={product.price}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Estoque</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          required
          aria-required="true"
          min="1"
          disabled={isSubmitting}
          className="w-full"
          placeholder="Digite a quantidade em estoque do produto"
          defaultValue={product.stock}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Atualizando..." : "Atualizar"}
      </Button>
    </form>
  );
}
