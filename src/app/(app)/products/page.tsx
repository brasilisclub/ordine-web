"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Header from "@/components/app/header";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/app/product-card";

import ProductActions from "@/actions/product";

import { Product } from "@/types/app";
import { RouteProps } from "@/types/route";

export default function OrdineProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const page: RouteProps = { label: "Produtos" };

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductActions.get();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <Header page={page} />
      <section
        className="flex flex-col gap- w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl" id="page-title">
            Produtos
          </h1>
          <Button asChild>
            <Link href="/products/register">Adicionar</Link>
          </Button>
        </header>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
