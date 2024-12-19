export interface User {
  username: string;
  password: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface Ordine {
  id?: number;
  client_name: string;
  status: boolean;
  table: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  ordine_products?: OrdineProduct[];
}

export interface OrdineProduct {
  id?: number;
  ordine_id?: number;
  product_id: number;
  product?: Product;
  quantity: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
