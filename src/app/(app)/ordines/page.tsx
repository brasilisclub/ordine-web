"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import OrdineCard from "@/components/app/ordine-card";
import { Ordine } from "@/types/app";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import OrdineActions from "@/actions/ordine";

export default function Ordines() {
  const [ordines, setOrdines] = useState<Ordine[]>([]);

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
      <header className="flex h-16 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Comandas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="page-title">
        <header className="flex items-center justify-between w-full mt-12">
          <h1 className="text-4xl flex items-end" id="page-title">
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
