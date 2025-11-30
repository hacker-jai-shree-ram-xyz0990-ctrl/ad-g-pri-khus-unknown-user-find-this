import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../auth/AdminAuthContext";
import API from "../api/adminApi";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "../context/ToastContext";

const AdminLogin = () => {
  const { login } = useAdminAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      showToast("Login Successful!", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast("Invalid Credentials!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          Admin Login
        </h1>
        <p className="text-xs text-gray-500 mb-6 text-center">
          Only authorized administrator can login
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-600">Email</label>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-transparent text-sm text-gray-900 flex-1 outline-none"
                placeholder="admin@gttechnovation.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-600">Password</label>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-transparent text-sm text-gray-900 flex-1 outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium
            bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 transition disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? "Logging in..." : "Login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;