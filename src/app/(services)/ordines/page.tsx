import Link from "next/link";

import styles from "./ordines.module.css";

export default function Ordines() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Comandas</h1>
        <Link href="ordines/register" className={styles.link}>Adicionar</Link>
      </header>
      <section className={styles.listing}>
      </section>
    </main>
  );
}
