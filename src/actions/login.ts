import { redirect } from 'next/navigation'
import ordineClient from '@/lib/OrdineClient';

async function login(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  const authApi = ordineClient.getApi('Auth');

  const response = await authApi?.post_auth_login({
    "user": { username, password }
  });

  switch (response?.status) {
    case 200:
      if (response.body?.token) {
        sessionStorage.setItem('token', response.body.token);
      }

      redirect('/');
      break;

    default:
      alert('Um erro inesperado ocorreu.');
  }
}

export default login;

