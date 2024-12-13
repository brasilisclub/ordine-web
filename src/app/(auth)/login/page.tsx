'use client'
import React, { useState, FormEvent, useCallback } from 'react'
import Link from 'next/link';
import { Button, Input } from '@/components';

import { useRouter } from 'next/navigation'
import { useOrdineClient } from '@/hooks/useOrdineClient'

import styles from './login.module.css';

export default function LoginPage() {
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
      const response = await ordineClient.swaggerClient.apis.Auth.post_auth_login({
        "user": { username, password }
      })

      switch (response.status) {
        case 200:
          router.push('/')
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
      console.error('Login error:', err)
      setError('Erro de conexão. Por favor, verifique a sua conexão.')
    } finally {
      setIsLoading(false)
    }
  }, [ordineClient, router])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Bem-vindo de volta</h2>
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
        Entrar
      </Button>
      <Link href="/register" className={styles.link}>Ainda não possui uma conta? Crie aqui</Link>
    </form>
  )
}

