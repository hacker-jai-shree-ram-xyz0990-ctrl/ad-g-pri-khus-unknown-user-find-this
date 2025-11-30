import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { AdminAuthProvider } from "./auth/AdminAuthContext";
import { ToastProvider } from "./context/ToastContext";
import Applicants from "./pages/Applicants";
import Internships from "./pages/Internships";
import Certificates from "./pages/Certificates";
import Payments from "./pages/Payments";
import Feedback from "./pages/Feedback";
import Testimonials from "./pages/Testimonials";
import WhyChooseUs from "./pages/WhyChooseUs";
import Projects from "./pages/Projects";

function App() {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedAdminRoute>
                  <Dashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/applicants"
              element={
                <ProtectedAdminRoute>
                  <Applicants />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/internships"
              element={
                <ProtectedAdminRoute>
                  <Internships />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/certificates"
              element={
                <ProtectedAdminRoute>
                  <Certificates />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/payments"
              element={
                <ProtectedAdminRoute>
                  <Payments />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/feedback"
              element={
                <ProtectedAdminRoute>
                  <Feedback />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/testimonials"
              element={
                <ProtectedAdminRoute>
                  <Testimonials />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/why-choose-us"
              element={
                <ProtectedAdminRoute>
                  <WhyChooseUs />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/projects"
              element={
                <ProtectedAdminRoute>
                  <Projects />
                </ProtectedAdminRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
        +{" "}
      </ToastProvider>
    </AdminAuthProvider>
  );
}

export default App;
