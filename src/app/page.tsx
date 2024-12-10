import styles from "./page.module.css";
import { Card } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Visão Geral</h1>
      <div className={styles.row}>
        <Card label="Produtos Listados" content="100"/>
      </div>
      <div className={styles.row}>
        <Card label="Produtos Listados" content="100"/>
        <Card label="Comandas Abertas" content="25"/>
      </div>
      <div className={styles.row}>
        <Card label="Produtos Pedidos" content="300"/>
        <Card label="Comandas Fechadas" content="100"/>
      </div>
    </main>
  );
}
