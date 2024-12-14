import { redirect } from 'next/navigation'
import ordineClient from '@/lib/OrdineClient';

async function register(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  const authApi = ordineClient.getApi('Auth');

  const response = await authApi?.post_auth_register({
    "user": { username, password }
  })

  switch (response?.status) {
    case 201:
      redirect('/login');
      break
    default:
      alert('Um erro inesperado ocorreu.')
  }
}

export default register;
