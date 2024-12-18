'use client'
import { Input, Button } from "@/components";

import styles from "../ordines.module.css";
import OrdineActions from '@/actions/ordine';

export default function OrdinesRegister() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Comandas &gt; Registrar</h1>
      </header>
      <form className={styles.form} action={OrdineActions.register}>
      <Input
        type="text"
        label="Nome do Cliente"
        name="client_name"
        required
        className={styles.input}
      /> 
      <Input
        type="number"
        label="Número da Mesa"
        name="table"
        required
        className={styles.input}
      />
      <Input
        type="checkbox"
        label="Status"
        name="status"
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
