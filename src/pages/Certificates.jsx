import { useEffect, useState } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Search, Trash2, FileBadge2 } from "lucide-react";
import { formatIST } from "../utils/istTime";

const Certificates = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/certificates?search=${search}`);
      setCertificates(res.data.data);
    } catch {
      showToast("Failed to load certificates!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCertificates();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this certificate?")) return;

    try {
      await API.delete(`/certificates/${id}`);
      showToast("Certificate removed!", "success");
      fetchCertificates();
    } catch {
      showToast("Delete failed!", "error");
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Certificates</h1>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
          >
            <input
              type="text"
              placeholder="Search by Unique ID / Name / Domain"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-blue-600 hover:text-blue-700">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Unique ID</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Issue Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {certificates.length === 0 && !loading && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      No certificate found
                    </td>
                  </tr>
                )}

                {certificates.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 border">
                    <td className="p-2 border">{item.fullName}</td>
                    <td className="p-2 border font-mono">{item.applicantUniqueId}</td>
                    <td className="p-2 border">{item.domain}</td>
                    <td className="p-2 border">{formatIST(item.issueDate)}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      {/* Future Buttons:
                      <button className="ml-2 text-blue-600 hover:text-blue-800">
                        <FileBadge2 className="w-5 h-5" />
                      </button>
                      */}
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

export default Certificates;