"use client";
import { useState, useEffect } from "react";

import Header from "@/components/app/header";
import { ProductPerOrdineChart } from "@/components/app/bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import OrdineActions from "@/actions/ordine";
import ProductActions from "@/actions/product";

import { RouteProps } from "@/types/route";
import { Ordine, Product } from "@/types/app";

export default function Home() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [ordines, setOrdines] = useState<Ordine[] | []>([]);
  const page: RouteProps = { label: "Visão Geral" };

  useEffect(() => {
    async function fetchProducts() {
      const data = await ProductActions.get();
      setProducts(data);
    }

    async function fetchOrdines() {
      const data = await OrdineActions.get();
      setOrdines(data);
    }

    fetchProducts();
    fetchOrdines();
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

  return (
    <main>
      <Header page={page} />
      <section className="grid grid-cols-2 gap-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Produtos Listados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comandas Abertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{open_ordines.length}</div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Produtos Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requested_products}</div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comandas Fechadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closed_ordines.length}</div>
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ProductPerOrdineChart chartData={chartData} />
        </div>
      </section>
    </main>
  );
}
