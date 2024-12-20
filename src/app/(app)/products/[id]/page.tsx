"use client";
import { use, useEffect, useState } from "react";

import Header from "@/components/app/header";
import { Button } from "@/components/ui/button";
import { ProductUpdateForm } from "@/components/forms/product-form";

import ProductActions from "@/actions/product";

import { Product } from "@/types/app";
import { RouteProps } from "@/types/route";

export default function ProductItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product>({} as Product);
  const routeLinks: RouteProps[] = [{ label: "Produtos", href: "/products" }];
  const routePage: RouteProps = { label: product.name };

  useEffect(() => {
    async function fetchProduct() {
      const data = await ProductActions.getById(resolvedParams.id);
      setProduct(data);
    }
    fetchProduct();
  }, [resolvedParams.id]);
  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <Header page={routePage} links={routeLinks} />
      <section
        className="flex flex-col gap-3 max-w-xl w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
            {product.name}
          </h1>
          <Button onClick={() => ProductActions.delete(String(product.id))}>
            Deletar produto
          </Button>
        </header>
        <ProductUpdateForm productId={resolvedParams.id} />
      </section>
    </main>
  );
}
