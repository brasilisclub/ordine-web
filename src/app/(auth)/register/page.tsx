'use client'
import React, { useState, FormEvent, useCallback } from 'react'
import Link from 'next/link';
import { Button, Input } from '@/components';

import { useRouter } from 'next/navigation'
import { useOrdineClient } from '@/hooks/useOrdineClient'

import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter()
  const { ordineClient } = useOrdineClient()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    if (!username || !password) {
      setError('Please enter both username and password')
      setIsLoading(false)
      return
    }

    try {
      const response = await ordineClient.swaggerClient.apis.Auth.post_auth_register({
        "user": { username, password }
      })

      switch (response.status) {
        case 201:
          // TO-DO: MOVE DIRECTLY TO HOME, INSTEAD OF GOING TO LOGIN
          router.push('/login')
          break
        case 400:
          setError(response.message)
          break
        case 500:
          setError(response.message)
          break
        default:
          setError('Um erro inesperado ocorreu.')
      }
    } catch (err) {
      console.error('Erro de registro:', err)
      setError('Erro de conexão. Por favor, verifique a sua conexão.')
    } finally {
      setIsLoading(false)
    }
  }, [ordineClient, router])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Seja bem-vindo</h2>
      {error ? (
        <p>{error}</p>
      ) : null}

      <Input
        type="text"
        label="Nome de usuário"
        name="username"
        required
        disabled={isLoading}
        className={styles.input}
      />
      <Input
        label="Senha"
        type="password"
        name="password"
        required
        disabled={isLoading}
        className={styles.input}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
        Criar conta
      </Button>
      <Link href="/login" className={styles.link}>Já possui uma conta? Entre aqui</Link>
    </form>
  )
}

