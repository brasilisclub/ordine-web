import { redirect } from "next/navigation";
import apiClient from "@/lib/ApiClient";

class AuthActions {
  private static async handleAuthRequest(
    method: "post_auth_login" | "post_auth_register",
    formData: FormData,
  ): Promise<void> {
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const authApi = apiClient.getApi("Auth");

    try {
      const response = await authApi?.[method]({
        user: { username, password },
      });

      if (response?.status === 200 && method === "post_auth_login") {
        sessionStorage.setItem("token", response.body.token);
        redirect("/");
      } else if (response?.status === 201 && method === "post_auth_register") {
        redirect("/login");
      } else {
        alert("Um erro inesperado ocorreu.");
      }
    } catch (error) {
      console.error("Error in handleAuthRequest:", error);
      alert("Um erro inesperado ocorreu.");
    }
  }

  static login(formData: FormData): Promise<void> {
    return AuthActions.handleAuthRequest("post_auth_login", formData);
  }

  static signup(formData: FormData): Promise<void> {
    return AuthActions.handleAuthRequest("post_auth_register", formData);
  }
}

export default AuthActions;
