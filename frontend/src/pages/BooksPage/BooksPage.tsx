import React, { useEffect, useState } from "react";
import { useAuth } from "@/context";
import { getBooksApi, createBookApi, deleteBookApi } from "@/api/books.api";
import type { Book } from "@/types";
import styles from "./BooksPage.module.css";

export const BooksPage: React.FC = () => {
  const { isAdmin } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPageCount, setNewPageCount] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooksApi();
      setBooks(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getBooksApi()
      .then((data) => {
        if (active) setBooks(data);
      })
      .catch((err: unknown) => {
        if (active) setError((err as Error).message || "Failed to load books");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newPageCount) return;

    try {
      setSubmitting(true);
      await createBookApi({
        name: newTitle,
        author: newAuthor,
        pageCount: Number(newPageCount),
      });
      setIsModalOpen(false);
      setNewTitle("");
      setNewAuthor("");
      setNewPageCount("");
      setLoading(true);
      loadBooks();
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to create book");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBookApi(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to delete book");
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Catalog 📖</h1>

        <div className={styles.controls}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {isAdmin && (
            <button
              className={styles.btnAdd}
              onClick={() => setIsModalOpen(true)}
            >
              + Add Book
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className={styles.empty}>Loading books...</div>
      ) : error ? (
        <div className={styles.empty}>{error}</div>
      ) : filteredBooks.length === 0 ? (
        <div className={styles.empty}>No books found</div>
      ) : (
        <div className={styles.grid}>
          {filteredBooks.map((book) => (
            <div key={book.id} className={styles.card}>
              <div>
                <h3 className={styles.bookTitle}>{book.name}</h3>
                <p className={styles.bookAuthor}>Author: {book.author}</p>
              </div>

              <div className={styles.bookMeta}>
                <span>📄 {book.pageCount} pages</span>
                {isAdmin && (
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>New Book</h2>
            <form onSubmit={handleCreateBook} className={styles.formGroup}>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Book Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Author"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <input
                type="number"
                required
                min="1"
                className={styles.input}
                placeholder="Page Count"
                value={newPageCount}
                onChange={(e) =>
                  setNewPageCount(e.target.value ? Number(e.target.value) : "")
                }
              />

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnDelete}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.btnAdd}
                >
                  {submitting ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
