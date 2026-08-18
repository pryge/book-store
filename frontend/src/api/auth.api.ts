import type { AuthResponse } from "@/types";
import { apiFetch } from "./clients";

export async function loginApi(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signupApi(data: {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
