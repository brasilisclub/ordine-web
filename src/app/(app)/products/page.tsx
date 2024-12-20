"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Product } from "@/types/app";
import { useEffect, useState } from "react";
import apiClient from "@/lib/ApiClient";
import ProductCard from "@/components/app/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdineProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productApi = apiClient.getApi("Product");
        const response = await productApi?.get_products();
        const data = await JSON.parse(response?.data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Produtos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <section
        className="flex flex-col gap- w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
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
