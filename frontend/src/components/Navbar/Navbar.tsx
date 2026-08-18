import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Book01Icon,
  User02Icon,
  Logout01Icon,
  Login01Icon,
  UserAdd01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoGroup}>
          <Link to="/" className={styles.logo}>
            <HugeiconsIcon icon={Book01Icon} size={24} />
            <span>BookStore</span>
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              <HugeiconsIcon icon={Book01Icon} size={18} />
              <span>Books</span>
            </Link>
            {isAdmin && (
              <Link to="/users" className={styles.navLink}>
                <HugeiconsIcon icon={UserGroupIcon} size={18} />
                <span>Users</span>
              </Link>
            )}
          </nav>
        </div>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <HugeiconsIcon icon={User02Icon} size={20} />
              </div>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{user?.name}</p>
                <p className={styles.userRole}>{user?.role}</p>
              </div>
              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={handleLogout}
              >
                <HugeiconsIcon icon={Logout01Icon} size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className={`${styles.btn} ${styles.btnGhost}`}>
                  <HugeiconsIcon icon={Login01Icon} size={16} />
                  <span>Login</span>
                </button>
              </Link>
              <Link to="/register">
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  <HugeiconsIcon icon={UserAdd01Icon} size={16} />
                  <span>Register</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
