"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Header from "@/components/app/header";
import { Button } from "@/components/ui/button";
import OrdineCard from "@/components/app/ordine-card";

import OrdineActions from "@/actions/ordine";

import { Ordine } from "@/types/app";
import { RouteProps } from "@/types/route";

export default function Ordines() {
  const [ordines, setOrdines] = useState<Ordine[]>([]);
  const page: RouteProps = { label: "Comandas", href: "/ordines" };

  useEffect(() => {
    async function fetchOrdines() {
      try {
        const data = await OrdineActions.get();
        setOrdines(data);
      } catch (error) {
        console.error("Error fetching ordines:", error);
      }
    }

    fetchOrdines();
  }, []);

  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <Header page={page} />
      <section className="flex flex-col gap-3" aria-labelledby="page-title">
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl" id="page-title">
            Comandas
          </h1>
          <Button
            asChild
            variant="default"
            className="transition-all duration-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Link href="ordines/register" aria-label="Adicionar nova comanda">
              Adicionar
            </Link>
          </Button>
        </header>
        <div className="h-full max-w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {ordines.map((ordine) => (
            <Link
              key={ordine.id}
              href={`ordines/${ordine.id}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
            >
              <OrdineCard
                table={Number(ordine.table)}
                status={ordine.status}
                ariaLabel={`Comanda para mesa ${ordine.table} - ${ordine.status ? "Ativa" : "Inativa"}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
