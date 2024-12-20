import { redirect } from "next/navigation";
import apiClient from "@/lib/ApiClient";
import { Product } from "@/types/app";

class ProductActions {
  private static async handleProductRequest(
    method: "post_products" | "put_products__id_",
    formData: FormData,
    id?: string,
  ): Promise<void> {
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));

    const productApi = apiClient.getApi("Product");
    const product: Product = { name, description, category, price, stock };

    const response = await productApi?.[method]({ product, id });

    if (response?.status === 201 || response?.status === 200) {
      redirect("/products");
    } else {
      alert("An error occurred.");
    }
  }

  static async get(): Promise<Product[]> {
    const productApi = apiClient.getApi("Product");
    const response = await productApi?.get_products();
    return JSON.parse(response?.data || "{}");
  }

  static async getById(id: string): Promise<Product> {
    const productApi = apiClient.getApi("Product");
    const response = await productApi?.get_products__id_({ id });
    return JSON.parse(response?.data || "{}");
  }

  static register(formData: FormData): Promise<void> {
    return ProductActions.handleProductRequest("post_products", formData);
  }

  static update(formData: FormData, id: string): Promise<void> {
    if (!id) {
      console.error("ID is required for updating a product");
      return Promise.resolve();
    }

    return ProductActions.handleProductRequest(
      "put_products__id_",
      formData,
      id,
    );
  }

  static async delete(id: string): Promise<void> {
    if (!id) {
      console.error("ID is required for deleting an ordine");
      return Promise.resolve();
    }
    const productApi = apiClient.getApi("Product");
    const response = await productApi?.delete_products__id_({ id });
    if (response?.status === 200) {
      redirect("/products");
    } else {
      alert("Um erro inesperado ocorreu.");
    }
  }
}

export default ProductActions;
