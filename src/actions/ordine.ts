import { redirect } from 'next/navigation';
import ordineClient from '@/lib/OrdineClient';
import { Ordine } from '@/types/app';

class OrdineActions {
  private static async handleOrdineRequest(method: 'post_ordines' | 'put_ordines', formData: FormData, id?: string): Promise<void> {
    const client_name = formData.get('client_name')?.toString() || '';
    const status = formData.get('status') === 'on';
    const table = Number(formData.get('table'));

    if (!client_name || isNaN(table)) {
      alert('Invalid form data');
      return;
    }

    const ordineApi = ordineClient.getApi('Ordine');
    const body: Ordine = { client_name, status, table };

    const response = await ordineApi?.[method]({ body, id });

    if (response?.status === 200) {
      redirect('/ordines');
    } else {
      alert('An error occurred.');
    }
  }

  static register(formData: FormData): Promise<void> {
    return OrdineActions.handleOrdineRequest('post_ordines', formData);
  }

  static update(formData: FormData): Promise<void> {
    const id = formData.get('id')?.toString();
    if (!id) {
      alert('ID is required for updating an ordine');
      return Promise.resolve();
    }
    return OrdineActions.handleOrdineRequest('put_ordines', formData, id);
  }
}

export default OrdineActions;


