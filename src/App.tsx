import { Navigate, Route, Routes } from "react-router-dom";
import { useGetUser } from "./hooks/useGetUser";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  const { checking } = useGetUser();

  if (checking === "loading") return <div>loading</div>;
  if (checking === "no-user") {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return <AdminLayout />;
}

export default App;
