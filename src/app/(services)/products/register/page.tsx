'use client'
import { Input, Button } from "@/components";

import ProductActions from '@/actions/product';
import styles from "../products.module.css";

export default function ProductsRegister() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Produtos &gt; Registrar</h1>
      </header>
      <form className={styles.form} action={ProductActions.register}>
      <Input
        type="text"
        label="Nome"
        name="name"
        required
        className={styles.input}
      />
      <Input
        type="text"
        label="Descrição"
        name="description"
        required
        className={styles.input}
      />
      <Input
        type="text"
        label="Categoria"
        name="category"
        required
        className={styles.input}
      />
      <Input
        type="number"
        label="Preço"
        name="price"
        required
        className={styles.input}
      />
      <Input
        type="number"
        label="Disponível no Estoque"
        name="stock"
        required
        className={styles.input}
      />
      <Button
        type="submit"
        className={styles.submitButton}
      >
        Criar
      </Button>

      </form>
    </main>
  );
}
