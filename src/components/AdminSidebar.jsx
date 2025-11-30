import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileBadge2,
  CreditCard,
  MessageCircle,
  Quote,
  Sparkles,
  FolderGit2,
} from "lucide-react";

const navItemClasses =
  "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-800 hover:text-white transition";

const activeClasses = "bg-slate-900 text-white";

const AdminSidebar = () => {
  return (
    <aside className="min-h-screen w-64 bg-slate-950 text-gray-300 border-r border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Navigation
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navItemClasses} ${isActive ? activeClasses : ""}`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/applicants"
          className={navItemClasses}
        >
          <Users className="w-4 h-4" />
          Applicants
        </NavLink>

        <NavLink
          to="/admin/internships"
          className={navItemClasses}
        >
          <Briefcase className="w-4 h-4" />
          Internships
        </NavLink>

        <NavLink
          to="/admin/certificates"
          className={navItemClasses}
        >
          <FileBadge2 className="w-4 h-4" />
          Certificates
        </NavLink>

        <NavLink
          to="/admin/payments"
          className={navItemClasses}
        >
          <CreditCard className="w-4 h-4" />
          Payments
        </NavLink>

        <NavLink
          to="/admin/feedback"
          className={navItemClasses}
        >
          <MessageCircle className="w-4 h-4" />
          Feedback
        </NavLink>

        <NavLink
          to="/admin/testimonials"
          className={navItemClasses}
        >
          <Quote className="w-4 h-4" />
          Testimonials
        </NavLink>

        {/* <NavLink
          to="/admin/why-choose-us"
          className={navItemClasses}
        >
          <Sparkles className="w-4 h-4" />
          Why Choose Us
        </NavLink> */}

        <NavLink
          to="/admin/projects"
          className={navItemClasses}
        >
          <FolderGit2 className="w-4 h-4" />
          Project Submissions
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;