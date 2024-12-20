import { redirect } from "next/navigation";
import apiClient from "@/lib/ApiClient";
import { Ordine, OrdineProduct } from "@/types/app";

class OrdineActions {
  private static async handleOrdineRequest<T>(
    method:
      | "post_ordines"
      | "put_ordines__id_"
      | "get_ordines__id_"
      | "post_ordines__id__products",
    formData: FormData | T,
    id?: string,
  ): Promise<void> {
    const ordineApi = await apiClient.getApi("Ordine");
    const body =
      formData instanceof FormData
        ? {
            client_name: formData.get("client_name")?.toString() || "",
            status: formData.get("status") === "false" ? false : true,
            table: Number(formData.get("table")),
            ordine_products: formData.getAll("ordine_products") || [],
          }
        : formData;

    const response = await ordineApi?.[method]({ body, id });

    if (response?.status === 200) {
      if (method === "post_ordines" || method === "put_ordines__id_") {
        redirect("/ordines");
      }
    } else {
      alert("Um erro inesperado ocorreu.");
    }
  }

  static async get(): Promise<Ordine[]> {
    const ordineApi = await apiClient.getApi("Ordine");
    const response = await ordineApi?.get_ordines();
    return JSON.parse(response?.data || {});
  }

  static async getById(id?: string): Promise<Ordine> {
    const ordineApi = await apiClient.getApi("Ordine");
    const response = await ordineApi?.get_ordines__id_({ id });
    return JSON.parse(response?.data || {});
  }

  static register(formData: FormData): Promise<void> {
    return OrdineActions.handleOrdineRequest("post_ordines", formData);
  }

  static update(formData: FormData, id: string): Promise<void> {
    if (!id) {
      console.error("ID is required for updating an ordine");
      return Promise.resolve();
    }
    return OrdineActions.handleOrdineRequest("put_ordines__id_", formData, id);
  }

  static close(ordineData: Ordine, id: string): Promise<void> {
    if (!id) {
      console.error("ID is required for closing an ordine");
      return Promise.resolve();
    }

    const formData = new FormData();
    formData.append("client_name", ordineData.client_name);
    formData.append("table", ordineData.table.toString());
    formData.append("status", "false");

    return OrdineActions.handleOrdineRequest("put_ordines__id_", formData, id);
  }

  static async addProducts(
    products: OrdineProduct[],
    id: string,
  ): Promise<void> {
    if (!id) {
      console.error("ID is required for adding products to an ordine");
      return Promise.resolve();
    }

    return OrdineActions.handleOrdineRequest(
      "post_ordines__id__products",
      products,
      id,
    );
  }

  static async delete(id: string): Promise<void> {
    if (!id) {
      console.error("ID is required for deleting an ordine");
      return Promise.resolve();
    }
    const ordineApi = await apiClient.getApi("Ordine");
    const response = await ordineApi?.delete_ordines__id_({ id });
    if (response?.status === 200) {
      redirect("/ordines");
    } else {
      alert("Um erro inesperado ocorreu.");
    }
  }
}

export default OrdineActions;
