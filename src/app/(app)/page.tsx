"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/ApiClient";
import { Ordine, Product } from "@/types/app";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductPerOrdineChart } from "@/components/app/bar-chart";
import Header from "@/components/app/header";
import { RouteProps } from "@/types/route";

export default function Home() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [ordines, setOrdines] = useState<Ordine[] | []>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const productApi = apiClient.getApi("Product");
        const response = await productApi?.get_products();
        if (response?.body) {
          setProducts(response.body);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function getOrdines() {
      try {
        const ordineApi = apiClient.getApi("Ordine");
        const response = await ordineApi?.get_ordines();
        if (response?.body) {
          setOrdines(response.body);
        }
      } catch (error) {
        console.error("Error fetching ordines:", error);
      }
    }

    getProducts();
    getOrdines();
  }, []);

  const requested_products = ordines.reduce(
    (total, ordine) => total + Number(ordine?.ordine_products?.length || 0),
    0,
  );

  const chartData = ordines.map((ordine) => {
    if (ordine.status) {
      return {
        ordine: ordine.table,
        products: ordine.ordine_products?.length || 0,
      };
    }
  });

  const open_ordines = ordines.filter((ordine) => ordine.status);
  const closed_ordines = ordines.filter((ordine) => !ordine.status);

  const page: RouteProps = {
    label: "Visão Geral",
  };

  return (
    <main className="h-full mb-8">
      <Header page={page} />
      <section className="flex flex-col gap-4 w-full h-full">
        <div className="flex w-full gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos Listados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Comandas Abertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{open_ordines.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full h-full gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produtos Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requested_products}</div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Comandas Fechadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closed_ordines.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full gap-4">
          <ProductPerOrdineChart chartData={chartData} />
        </div>
      </section>
    </main>
  );
}
