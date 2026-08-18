import React, { useEffect, useState } from "react";
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from "@/api/users.api";
import type { User, Role } from "@/types";
import styles from "./UsersPage.module.css";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<Role>("user");
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsersApi();
      setUsers(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getUsersApi()
      .then((data) => {
        if (active) setUsers(data);
      })
      .catch((err: unknown) => {
        if (active) setError((err as Error).message || "Failed to load users");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) return;

    try {
      setSubmitting(true);
      await createUserApi({
        name: newName,
        email: newEmail,
        password: newPassword,
        role: newRole,
      });
      setIsModalOpen(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("user");
      setLoading(true);
      loadUsers();
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleRole = async (user: User) => {
    const nextRole: Role = user.role === "admin" ? "user" : "admin";
    try {
      await updateUserApi(user.id, { role: nextRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: nextRole } : u))
      );
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to update user role");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      alert((err as Error).message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Management 👥</h1>

        <div className={styles.controls}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={styles.btnAdd}
            onClick={() => setIsModalOpen(true)}
          >
            + Add User
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.empty}>Loading users...</div>
      ) : error ? (
        <div className={styles.empty}>{error}</div>
      ) : filteredUsers.length === 0 ? (
        <div className={styles.empty}>No users found</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        user.role === "admin" ? styles.badgeAdmin : styles.badgeUser
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.btnAction}
                        onClick={() => handleToggleRole(user)}
                      >
                        Set as {user.role === "admin" ? "User" : "Admin"}
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>New User</h2>
            <form onSubmit={handleCreateUser} className={styles.formGroup}>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Full Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="email"
                required
                className={styles.input}
                placeholder="Email Address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <input
                type="password"
                required
                className={styles.input}
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <select
                className={styles.select}
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as Role)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

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
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
