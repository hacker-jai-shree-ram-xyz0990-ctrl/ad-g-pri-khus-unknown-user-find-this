import { useAdminAuth } from "../auth/AdminAuthContext";
import { LogOut, User } from "lucide-react";

const AdminNavbar = () => {
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="w-full h-14 bg-slate-900 text-white flex items-center justify-between px-4 shadow-sm">
      <div className="font-semibold text-lg tracking-wide">
        GT Technovation Admin
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>Super Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;