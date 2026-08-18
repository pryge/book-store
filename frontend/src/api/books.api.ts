import { apiFetch } from "./clients";
import type { Book } from "@/types";

interface BooksResponse {
  status: string;
  results: number;
  data: { books: Book[] };
}

interface BookResponse {
  status: string;
  data: { book: Book };
}

export async function getBooksApi(): Promise<Book[]> {
  const res = await apiFetch<BooksResponse>("/api/books");
  return res.data.books;
}

export async function getBookByIdApi(id: string): Promise<Book> {
  const res = await apiFetch<BookResponse>(`/api/books/${id}`);
  return res.data.book;
}

export async function createBookApi(data: {
  name: string;
  author: string;
  pageCount: number;
}): Promise<Book> {
  const res = await apiFetch<BookResponse>("/api/books", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data.book;
}

export async function updateBookApi(
  id: string,
  data: Partial<{ name: string; author: string; pageCount: number }>
): Promise<Book> {
  const res = await apiFetch<BookResponse>(`/api/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data.book;
}

export async function deleteBookApi(id: string): Promise<void> {
  await apiFetch<{ status: string; message: string }>(`/api/books/${id}`, {
    method: "DELETE",
  });
}
