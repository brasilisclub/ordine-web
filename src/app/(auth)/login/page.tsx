'use client'
import React from 'react'
import Link from 'next/link';
import { Button, Input } from '@/components';

import login from '@/actions/login';

import styles from './login.module.css';

export default function LoginPage() {
  return (
    <form className={styles.form} action={login}>
      <h2>Bem-vindo de volta</h2>
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
        Entrar
      </Button>
      <Link href="/register" className={styles.link}>Ainda não possui uma conta? Crie aqui</Link>
    </form>
  )
}

