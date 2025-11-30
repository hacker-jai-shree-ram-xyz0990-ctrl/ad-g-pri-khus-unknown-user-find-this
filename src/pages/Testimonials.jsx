import { useEffect, useState } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Star, Search, Trash2, CheckCircle, XCircle } from "lucide-react";
import { formatIST } from "../utils/istTime";

const Testimonials = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/testimonials?search=${search}`);
      setTestimonials(res.data.data);
    } catch {
      showToast("Failed to load testimonials!", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await API.put(`/testimonials/${id}`, {
        isApproved: !current,
      });
      showToast(`Status updated!`, "success");
      fetchTestimonials();
    } catch {
      showToast("Update failed!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await API.delete(`/testimonials/${id}`);
      showToast("Testimonial deleted!", "success");
      fetchTestimonials();
    } catch {
      showToast("Delete failed!", "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Testimonials
          </h1>

          {/* 🔍 Search */}
          <form
            onSubmit={handleSearch}
            className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
          >
            <input
              type="text"
              placeholder="Search by name or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-blue-600 hover:text-blue-700">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* 📄 Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Approved</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No testimonials found
                    </td>
                  </tr>
                )}

                {testimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{t.name}</td>
                    <td className="p-2 border">{t.domain}</td>
                    <td className="p-2 border max-w-xs truncate">{t.message}</td>
                    <td className="p-2 border text-center font-medium">
                      {t.isApproved ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-red-600">Hidden</span>
                      )}
                    </td>
                    <td className="p-2 border">{formatIST(t.createdAt)}</td>

                    <td className="p-2 border flex justify-center gap-3">
                      {/* Toggle visibility */}
                      <button
                        onClick={() => toggleStatus(t._id, t.isApproved)}
                        className={`${
                          t.isApproved
                            ? "text-yellow-600 hover:text-yellow-800"
                            : "text-green-600 hover:text-green-800"
                        }`}
                      >
                        {t.isApproved ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(t._id)}
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

export default Testimonials;