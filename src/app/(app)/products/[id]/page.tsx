"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductUpdateForm } from "@/components/forms/product-form";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { use, useEffect, useState } from "react";
import ProductActions from "@/actions/product";
import { Product } from "@/types/app";

export default function ProductItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    async function fetchProduct() {
      const data = await ProductActions.getById(resolvedParams.id);
      setProduct(data);
    }
    fetchProduct();
  }, [resolvedParams.id]);
  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/products">Produtos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <section
        className="flex flex-col gap-3 max-w-xl w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
            <span className="opacity-25">Produto &gt;&nbsp;</span>
            {product.name}
          </h1>
        </header>
        <ProductUpdateForm productId={resolvedParams.id} />
      </section>
    </main>
  );
}
