"use client"
import { useState, useEffect } from "react";
import { Card } from "@/components";
import ordineClient from "@/lib/OrdineClient";

import { Ordine, Product } from "@/types/app";

import styles from "./page.module.css";

export default function Home() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [ordines, setOrdines] = useState<Ordine[] | []>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const productApi = ordineClient.getApi('Product');
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
        const ordineApi = ordineClient.getApi('Ordine');
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

  let requested_products = 0;
  ordines.map((ordine) => requested_products += Number(ordine?.ordine_products?.length || 0))
  const open_ordines = ordines.filter((ordine) => ordine.status);
  const closed_ordines = ordines.filter((ordine) => !ordine.status);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Visão Geral</h1>
      <div className={styles.row}>
        <Card label="Produtos Listados" content="100"/>
      </div>
      <div className={styles.row}>
        <Card label="Produtos Listados" content={products.length.toString()}/>
        <Card label="Comandas Abertas" content={open_ordines.length.toString()}/>
      </div>
      <div className={styles.row}>
        <Card label="Produtos Pedidos" content={requested_products.toString()}/>
        <Card label="Comandas Fechadas" content={closed_ordines.length.toString()}/>
      </div>
    </main>
  );
}
