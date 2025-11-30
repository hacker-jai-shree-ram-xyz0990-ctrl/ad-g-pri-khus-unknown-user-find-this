import { useEffect, useState } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { ExternalLink, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { formatIST } from "../utils/istTime";

const Projects = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/projects`);
      setProjects(res.data.data);
    } catch {
      showToast("Failed to load project submissions", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/projects/${id}`, { status });
      showToast(`Project marked as ${status}!`, "success");
      fetchProjects();
    } catch {
      showToast("Failed to update status!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project submission?")) return;
    try {
      await API.delete(`/projects/${id}`);
      showToast("Project removed!", "success");
      fetchProjects();
    } catch {
      showToast("Failed to delete!", "error");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const statusColor = {
    pending: "text-yellow-600",
    approved: "text-green-600",
    rejected: "text-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-xl font-bold">Project Submissions</h1>

          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Unique ID</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Project Link</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Submitted On</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No project submissions found
                    </td>
                  </tr>
                )}

                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{p.name}</td>
                    <td className="p-2 border font-mono">{p.uniqueId}</td>
                    <td className="p-2 border">{p.domain}</td>

                    <td className="p-2 border">
                      <a
                        href={p.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>

                    <td className={`p-2 border font-medium ${statusColor[p.status]}`}>
                      {p.status}
                    </td>

                    <td className="p-2 border">{formatIST(p.createdAt)}</td>

                    <td className="p-2 border flex justify-center gap-3">
                      {p.status !== "approved" && (
                        <button
                          onClick={() => handleStatusChange(p._id, "approved")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {p.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusChange(p._id, "rejected")}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;