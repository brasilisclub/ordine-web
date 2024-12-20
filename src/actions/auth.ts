import apiClient from "@/lib/ApiClient";
import { ApiResponse } from "@/types/api";

class AuthActions {
  private static async handleAuthRequest(
    method: "post_auth_login" | "post_auth_register",
    formData: FormData,
  ): Promise<ApiResponse | unknown> {
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const authApi = await apiClient.getApi("Auth");
    try {
      const response = await authApi?.[method]({
        user: { username, password },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  static login(formData: FormData): Promise<ApiResponse | unknown> {
    return AuthActions.handleAuthRequest("post_auth_login", formData);
  }

  static signup(formData: FormData): Promise<ApiResponse | unknown> {
    return AuthActions.handleAuthRequest("post_auth_register", formData);
  }
}

export default AuthActions;
