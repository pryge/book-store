import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProtectedRoute, AdminRoute } from "@/guards";
import { LoginPage } from "@/pages/AuthPages/LoginPage";
import { RegisterPage } from "@/pages/AuthPages/RegisterPage";
import { BooksPage } from "@/pages/BooksPage/BooksPage";
import { UsersPage } from "@/pages/UsersPage/UsersPage";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BooksPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
