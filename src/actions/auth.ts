/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import apiClient from "@/lib/ApiClient";

class AuthActions {
  private static async handleAuthRequest(
    method: "post_auth_login" | "post_auth_register",
    formData: FormData,
    handleResponse: (response: any) => void,
  ): Promise<void> {
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const authApi = apiClient.getApi("Auth");
    const response = await authApi?.[method]({
      user: { username, password },
    });
    handleResponse(response);
  }

  static login(formData: FormData): Promise<void> {
    function handleResponse(response: any) {
      if (response?.status === 200) {
        sessionStorage.setItem("token", response.body.token);
        redirect("/");
      } else {
        alert("Um erro inesperado ocorreu.");
      }
    }
    return AuthActions.handleAuthRequest(
      "post_auth_login",
      formData,
      handleResponse,
    );
  }

  static signup(formData: FormData): Promise<void> {
    function handleResponse(response: any) {
      if (response?.status === 201) {
        redirect("/login");
      } else {
        alert("Um erro inesperado ocorreu.");
      }
    }
    return AuthActions.handleAuthRequest(
      "post_auth_register",
      formData,
      handleResponse,
    );
  }
}

export default AuthActions;
