import { redirect } from 'next/navigation';
import ordineClient from '@/lib/OrdineClient';
import { Product } from '@/types/app';

class ProductActions {
  private static async handleProductRequest(method: 'post_products' | 'put_products', formData: FormData, id?: string): Promise<void> {
    const name = formData.get('name')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));

    const productApi = ordineClient.getApi('Product');
    const product: Product = { name, description, category, price, stock };

    const response = await productApi?.[method]({ product, id });

    if (response?.status === 201) {
      redirect('/products');
    } else {
      alert('An error occurred.');
    }
  }

  static register(formData: FormData): Promise<void> {
    return ProductActions.handleProductRequest('post_products', formData);
  }

  static update(formData: FormData): Promise<void> {
    const id = formData.get('id')?.toString();
    if (!id) {
      alert('ID is required for updating a product');
      return Promise.resolve();
    }
    return ProductActions.handleProductRequest('put_products', formData, id);
  }
}

export default ProductActions;
