"use client";
import OrdineActions from "@/actions/ordine";
import { OrdineProduct, Product } from "@/types/app";
import { use, useEffect, useState } from "react";
import apiClient from "@/lib/ApiClient";
import ProductCard from "@/components/app/product-card";
import { RouteProps } from "@/types/route";
import Header from "@/components/app/header";

export default function OrdineProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<OrdineProduct[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ordineData, setOrdineData] = useState<any>({
    client_name: "",
    table: 0,
    status: false,
    ordine_products: [],
  });

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
    async function fetchOrdineData() {
      try {
        const data = await OrdineActions.getById(resolvedParams.id);
        setOrdineData({
          table: data.table,
          status: data.status,
          ordine_products: data.ordine_products || [],
        });
        setSelectedProducts(data.ordine_products || []);
      } catch (error) {
        console.error("Error fetching ordination data:", error);
      }
    }

    fetchProducts();
    fetchOrdineData();
  }, [resolvedParams.id]);

  const links: RouteProps[] = [
    {
      label: "Comandas",
      href: "/ordines",
      type: "link",
    },
    {
      label: `Mesa ${ordineData.table}`,
      href: `/ordines/${resolvedParams.id}`,
      type: "link",
    },
  ];
  const page: RouteProps = {
    label: "Adicionar Produtos",
    type: "page",
  };

  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <Header links={links} page={page} />
      <section
        className="flex flex-col gap- w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
            <span className="opacity-25">Comanda &gt;&nbsp;</span>
            {ordineData.table}
          </h1>
        </header>
        <div className="flex flex-col gap-4">
          {products.map((product) => {
            const prevQuantity =
              selectedProducts.find(
                (selectedProduct) => selectedProduct.id === product.id,
              )?.quantity || 0;
            console.log(prevQuantity, product.name);
            return (
              <ProductCard
                key={product.id}
                product={product}
                prevQuantity={prevQuantity}
                onAdd={OrdineActions.addProducts}
                ordineId={resolvedParams.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
