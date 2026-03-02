import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import TeacherForm from "./component/addTeacher";
import MainLayout from "./pages/layout";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginPage from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/teachers" element={<TeacherForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;