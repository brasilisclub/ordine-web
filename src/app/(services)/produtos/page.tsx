import Link from "next/link";
import styles from "./produtos.module.css";

export default function Produtos() {
  
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Produtos</h1>
        <Link href="" className={styles.link}>Adicionar</Link>
      </header>
      <section className={styles.listing}>
        
      </section>
    </main>
  );
}
