"use client";
import OrdineActions from "@/actions/ordine";
import ProductCard from "@/components/app/product-card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Ordine, Product } from "@/types/app";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductActions from "@/actions/product";

export default function OrdineItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    [] as number[],
  );
  const [ordineData, setOrdineData] = useState<Ordine>({
    client_name: "",
    table: 0,
    status: false,
    ordine_products: [],
  });

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductActions.get();
      setProducts(data);
    }

    async function fetchOrdineData() {
      try {
        const data = await OrdineActions.getById(resolvedParams.id);
        setOrdineData({
          client_name: data.client_name,
          table: data.table,
          status: data.status,
          ordine_products: data.ordine_products || [],
        });
        const selectedProducts = data.ordine_products?.map(
          (ordineProduct) => ordineProduct.product_id,
        );
        setSelectedProducts(selectedProducts || []);
      } catch (error) {
        console.error("Error fetching ordination data:", error);
      }
    }

    fetchProducts();
    fetchOrdineData();
  }, [resolvedParams.id]);
  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/ordines">Comandas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Mesa {ordineData.table}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <section
        className="flex flex-col gap-4 w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
            <span className="opacity-25">Comanda &gt;&nbsp;</span>
            {ordineData.table}
          </h1>
          <div className="flex gap-4">
            {ordineData.status ? (
              <Button
                variant={"outline"}
                onClick={() =>
                  OrdineActions.close(ordineData, resolvedParams.id)
                }
              >
                Fechar Comanda
              </Button>
            ) : null}
            <Button onClick={() => OrdineActions.delete(resolvedParams.id)}>
              Deletar comanda
            </Button>
          </div>
        </header>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl">Informações</h3>
            <p className="text-lg">
              Status{" "}
              <span className="font-bold text-red-800">
                {ordineData.status ? "Aberto" : "Fechado"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-2xl">Produtos</h3>
              <Button variant={"outline"} asChild>
                <Link href={`/ordines/${resolvedParams.id}/products`}>
                  Adicionar produtos
                </Link>
              </Button>
            </div>

            {products.map((product) => {
              if (selectedProducts.includes(Number(product?.id))) {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    ordineId={resolvedParams.id}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
