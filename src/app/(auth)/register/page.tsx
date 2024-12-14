'use client'
import React from 'react'
import Link from 'next/link';
import { Button, Input } from '@/components';

import register from '@/actions/register';

import styles from './register.module.css';

export default function RegisterPage() {
   return (
    <form className={styles.form} action={register}>
      <h2>Seja bem-vindo</h2>
      <Input
        type="text"
        label="Nome de usuário"
        name="username"
        required
        className={styles.input}
      />
      <Input
        label="Senha"
        type="password"
        name="password"
        required
        className={styles.input}
      />
      <Button
        type="submit"
        className={styles.submitButton}
      >
        Criar conta
      </Button>
      <Link href="/login" className={styles.link}>Já possui uma conta? Entre aqui</Link>
    </form>
  )
}

