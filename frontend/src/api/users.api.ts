import { apiFetch } from "./clients";
import type { User, Role } from "@/types";

interface UsersResponse {
  status: string;
  results: number;
  data: { users: User[] };
}

interface UserResponse {
  status: string;
  data: { user: User };
}

export async function getUsersApi(): Promise<User[]> {
  const res = await apiFetch<UsersResponse>("/api/users");
  return res.data.users;
}

export async function createUserApi(data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}): Promise<User> {
  const res = await apiFetch<UserResponse>("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data.user;
}

export async function updateUserApi(
  id: string,
  data: Partial<{ name: string; email: string; role: Role; password?: string }>
): Promise<User> {
  const res = await apiFetch<UserResponse>(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data.user;
}

export async function deleteUserApi(id: string): Promise<void> {
  await apiFetch<{ status: string; message: string }>(`/api/users/${id}`, {
    method: "DELETE",
  });
}
