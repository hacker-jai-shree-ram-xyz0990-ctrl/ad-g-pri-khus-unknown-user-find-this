// import { useEffect, useState } from "react";
// import API from "../api/adminApi";
// import AdminNavbar from "../components/AdminNavbar";
// import AdminSidebar from "../components/AdminSidebar";
// import PreLoader from "../components/PreLoader";
// import { useToast } from "../context/ToastContext";
// import { Search, Trash2 } from "lucide-react";

// const Applicants = () => {
//   const { showToast } = useToast();

//   const [loading, setLoading] = useState(true);
//   const [applicants, setApplicants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchApplicants = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get(
//         `/applicants?page=${page}&limit=${limit}&search=${search}`
//       );
//       setApplicants(res.data.data);
//       setTotalPages(res.data.pagination.totalPages);
//     } catch (error) {
//       showToast("Failed to load applicants!", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure? This cannot be undone!")) return;

//     try {
//       await API.delete(`/applicants/${id}`);
//       showToast("Applicant removed!", "success");
//       fetchApplicants();
//     } catch (error) {
//       showToast("Delete failed!", "error");
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, [page]); // Fetch again when page updates

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchApplicants();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
//       {loading && <PreLoader />}
//       <AdminNavbar />
//       <div className="flex flex-1">
//         <AdminSidebar />

//         <main className="flex-1 p-6 space-y-6">
//           <h1 className="text-xl font-bold">Applicants</h1>

//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearch}
//             className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
//           >
//             <input
//               type="text"
//               placeholder="Search by name, email or domain..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 text-sm outline-none"
//             />
//             <button className="text-blue-600 hover:text-blue-700">
//               <Search className="w-5 h-5" />
//             </button>
//           </form>

//           {/* Table */}
//           <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
//             <table className="w-full text-sm border-collapse">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="p-2 border">Name</th>
//                   <th className="p-2 border">Email</th>
//                   <th className="p-2 border">Domain</th>
//                   <th className="p-2 border">Unique ID</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {applicants.length === 0 && !loading && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4">
//                       No records found
//                     </td>
//                   </tr>
//                 )}

//                 {applicants.map((app) => (
//                   <tr
//                     key={app._id}
//                     className="hover:bg-gray-50 transition border"
//                   >
//                     <td className="p-2 border">{app.fullName}</td>
//                     <td className="p-2 border">{app.email}</td>
//                     <td className="p-2 border">{app.domain}</td>
//                     <td className="p-2 border font-mono">{app.uniqueId}</td>
//                     <td className="p-2 border text-center">
//                       <button
//                         onClick={() => handleDelete(app._id)}
//                         className="p-1 text-red-600 hover:text-red-800 transition"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-3 mt-3">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((prev) => prev - 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Prev
//             </button>

//             <span className="text-sm text-gray-700">
//               Page {page} of {totalPages}
//             </span>

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((prev) => prev + 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Applicants;












// import { useEffect, useState } from "react";
// import API from "../api/adminApi";
// import AdminNavbar from "../components/AdminNavbar";
// import AdminSidebar from "../components/AdminSidebar";
// import PreLoader from "../components/PreLoader";
// import { useToast } from "../context/ToastContext";
// import {
//   Search,
//   Trash2,
//   Eye,
//   X,
//   Phone,
//   Globe,
//   GraduationCap,
//   MapPin,
//   CalendarDays,
// } from "lucide-react";

// const formatDate = (d) =>
//   d
//     ? new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
//     : "NA";

// const Applicants = () => {
//   const { showToast } = useToast();
//   const [loading, setLoading] = useState(true);
//   const [applicants, setApplicants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   const [selected, setSelected] = useState(null);

//   const fetchApplicants = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get(
//         `/applicants?page=${page}&limit=${limit}&search=${search}`
//       );
//       setApplicants(res.data.data);
//       setTotalPages(res.data.pagination.totalPages);
//     } catch {
//       showToast("Failed to load applicants!", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("This action cannot be undone!")) return;
//     try {
//       await API.delete(`/applicants/${id}`);
//       showToast("Applicant deleted!", "success");
//       fetchApplicants();
//     } catch {
//       showToast("Delete failed!", "error");
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, [page]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchApplicants();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
//       {loading && <PreLoader />}
//       <AdminNavbar />
//       <div className="flex flex-1">
//         <AdminSidebar />

//         <main className="flex-1 p-6 space-y-6">
//           <h1 className="text-xl font-bold">Applicants</h1>

//           {/* Search */}
//           <form
//             onSubmit={handleSearch}
//             className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
//           >
//             <input
//               type="text"
//               placeholder="Search by name, email, uniqueId or domain..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 text-sm outline-none"
//             />
//             <button className="text-blue-600 hover:text-blue-700">
//               <Search className="w-5 h-5" />
//             </button>
//           </form>

//           {/* Table */}
//           <div className="overflow-auto bg-white border rounded-lg shadow-sm">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="p-2 border">Name</th>
//                   <th className="p-2 border">Email</th>
//                   <th className="p-2 border">Domain</th>
//                   <th className="p-2 border">Duration</th>
//                   <th className="p-2 border">Created</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {applicants.length === 0 && !loading && (
//                   <tr>
//                     <td colSpan="7" className="text-center py-4">
//                       No results found
//                     </td>
//                   </tr>
//                 )}

//                 {applicants.map((a) => (
//                   <tr key={a._id} className="hover:bg-gray-50">
//                     <td className="p-2 border">{a.fullName}</td>
//                     <td className="p-2 border">{a.email}</td>
//                     <td className="p-2 border">{a.domain}</td>
//                     <td className="p-2 border">{a.duration}</td>
//                     <td className="p-2 border">{formatDate(a.createdAt)}</td>
//                     <td className="p-2 border text-center flex justify-center gap-3">
//                       <button
//                         onClick={() => setSelected(a)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Eye className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(a._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-3 mt-3">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => p - 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Prev
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((p) => p + 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </main>
//       </div>

//       {/* Details Modal */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
//           <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-xl shadow-xl overflow-hidden">
//             {/* Header */}
//             <div className="flex justify-between items-center px-5 py-3 border-b bg-gray-50">
//               <h2 className="font-semibold text-lg">
//                 Applicant Details
//               </h2>
//               <button
//                 className="hover:bg-gray-300 rounded-full p-1"
//                 onClick={() => setSelected(null)}
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Scrollable Content */}
//             <div className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <p><b>Name:</b> {selected.fullName}</p>
//                 <p><b>Email:</b> {selected.email}</p>
//                 <p><b>Phone:</b> {selected.phone}</p>
//                 <p><b>Domain:</b> {selected.domain}</p>
//                 <p><b>Duration:</b> {selected.duration}</p>
//                 <p><b>UniqueID:</b> {selected.uniqueId}</p>
//                 <p><b>DOB:</b> {formatDate(selected.dob)}</p>
//                 <p><b>College:</b> {selected.college}</p>
//                 <p className="col-span-2"><b>Address:</b> {selected.address}</p>
//                 <p><b>Payment Checked:</b> {selected.paymentChecked ? "Yes" : "No"}</p>
//                 <p><b>Email Confirmed:</b> {selected.emailConfirmed ? "Yes" : "No"}</p>

//                 {/* Internship Status */}
//                 <p><b>Start Date:</b> {formatDate(selected.startDate)}</p>
//                 <p><b>End Date:</b> {formatDate(selected.endDate)}</p>

//                 {/* Cert + Feedback */}
//                 <p><b>Certificate Generated:</b> {selected.certificateGenerated ? "Yes" : "No"}</p>
//                 <p><b>Certificate Sent:</b> {selected.certificateSent ? "Yes" : "No"}</p>
//                 <p><b>Feedback Submitted:</b> {selected.feedbackSubmitted ? "Yes" : "No"}</p>

//                 {/* Links */}
//                 <p className="col-span-2">
//                   <b>LinkedIn:</b>{" "}
//                   {selected.linkedin ? (
//                     <a
//                       href={selected.linkedin}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:underline break-all"
//                     >
//                       {selected.linkedin}
//                     </a>
//                   ) : "NA"}
//                 </p>

//                 <p className="col-span-2">
//                   <b>Github:</b>{" "}
//                   {selected.github ? (
//                     <a
//                       href={selected.github}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:underline break-all"
//                     >
//                       {selected.github}
//                     </a>
//                   ) : "NA"}
//                 </p>

//                 {/* JSON debug blocks */}
//                 {selected.payment && (
//                   <details className="col-span-2 bg-black text-white p-3 rounded-lg">
//                     <summary className="cursor-pointer font-semibold">
//                       Payment Data
//                     </summary>
//                     <pre className="text-xs mt-2 overflow-auto">
//                       {JSON.stringify(selected.payment, null, 2)}
//                     </pre>
//                   </details>
//                 )}

//                 {selected.learningPath && selected.learningPath.length > 0 && (
//                   <details className="col-span-2 bg-black text-white p-3 rounded-lg">
//                     <summary className="cursor-pointer font-semibold">
//                       Learning Path
//                     </summary>
//                     <pre className="text-xs mt-2">
//                       {JSON.stringify(selected.learningPath, null, 2)}
//                     </pre>
//                   </details>
//                 )}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="flex justify-end px-5 py-3 border-t bg-gray-50">
//               <button
//                 className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
//                 onClick={() => setSelected(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Applicants;









import { useEffect, useState, useMemo } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Search, Trash2, Eye, X } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : "NA";

const DOMAIN_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#06b6d4",
  "#eab308",
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
  "#64748b",
];

const DURATION_BAR_COLOR = "#3b82f6";

const Applicants = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [analytics, setAnalytics] = useState({
    dailyRegistrations: [],
    domainStats: [],
    durationStats: [],
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState(null);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/applicants?page=${page}&limit=${limit}&search=${search}`
      );
      setApplicants(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setAnalytics(
        res.data.analytics || {
          dailyRegistrations: [],
          domainStats: [],
          durationStats: [],
        }
      );
    } catch {
      showToast("Failed to load applicants!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone!")) return;

    try {
      await API.delete(`/applicants/${id}`);
      showToast("Applicant removed!", "success");
      fetchApplicants();
    } catch {
      showToast("Delete failed!", "error");
    }
  };

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchApplicants();
  };

  // ---- Derived data for charts ----
  const dailyChartData = useMemo(
    () =>
      (analytics.dailyRegistrations || []).map((item) => ({
        ...item,
        label: new Date(item.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
      })),
    [analytics.dailyRegistrations]
  );

  const domainChartData = analytics.domainStats || [];
  const durationChartData = analytics.durationStats || [];

  const totalApplicants = useMemo(
    () => (analytics.dailyRegistrations || []).reduce((sum, d) => sum + d.count, 0),
    [analytics.dailyRegistrations]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <h1 className="text-xl font-bold">Applicants</h1>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
            >
              <input
                type="text"
                placeholder="Search by name, email, uniqueId or domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none"
              />
              <button className="text-blue-600 hover:text-blue-700">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Total Applicants (matching search)</p>
              <p className="text-2xl font-bold mt-1">{totalApplicants}</p>
            </div>
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Current Page</p>
              <p className="text-xl font-semibold mt-1">
                Page {page} of {totalPages}
              </p>
            </div>
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Records on this page</p>
              <p className="text-2xl font-bold mt-1">{applicants.length}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Daily Registrations */}
            <div className="bg-white border rounded-xl p-4 shadow-sm xl:col-span-2">
              <h2 className="text-sm font-semibold mb-3">
                Daily User Registrations (matching current search)
              </h2>
              {dailyChartData.length === 0 ? (
                <p className="text-xs text-gray-500">No data to display.</p>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="Registrations"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Domain Pie */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold mb-3">
                Domain-wise Registrations
              </h2>
              {domainChartData.length === 0 ? (
                <p className="text-xs text-gray-500">No data to display.</p>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={domainChartData}
                        dataKey="count"
                        nameKey="domain"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        {domainChartData.map((_, index) => (
                          <Cell
                            key={`cell-domain-${index}`}
                            fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Duration Chart */}
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3">
              Duration-wise Registrations
            </h2>
            {durationChartData.length === 0 ? (
              <p className="text-xs text-gray-500">No data to display.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={durationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="Registrations"
                      fill={DURATION_BAR_COLOR}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Duration</th>
                  <th className="p-2 border">Unique ID</th>
                  <th className="p-2 border">Created</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {applicants.length === 0 && !loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No records found
                    </td>
                  </tr>
                )}

                {applicants.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition border"
                  >
                    <td className="p-2 border whitespace-nowrap">
                      {app.fullName}
                    </td>
                    <td className="p-2 border whitespace-nowrap">
                      {app.email}
                    </td>
                    <td className="p-2 border whitespace-nowrap">
                      {app.domain}
                    </td>
                    <td className="p-2 border whitespace-nowrap">
                      {app.duration}
                    </td>
                    <td className="p-2 border font-mono whitespace-nowrap">
                      {app.uniqueId}
                    </td>
                    <td className="p-2 border whitespace-nowrap">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="p-2 border text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelected(app)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-1 text-red-600 hover:text-red-800 transition"
                          title="Delete Applicant"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
            >
              Prev
            </button>

            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b bg-gray-50">
              <div>
                <h2 className="font-semibold text-lg">
                  Applicant Details
                </h2>
                <p className="text-xs text-gray-500">
                  Created: {formatDate(selected.createdAt)}
                </p>
              </div>
              <button
                className="hover:bg-gray-200 rounded-full p-1"
                onClick={() => setSelected(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[75vh] text-sm">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <b>Full Name:</b> {selected.fullName}
                </p>
                <p>
                  <b>Email:</b> {selected.email}
                </p>
                <p>
                  <b>Phone:</b> {selected.phone}
                </p>
                <p>
                  <b>Unique ID:</b> {selected.uniqueId}
                </p>
                <p>
                  <b>Domain:</b> {selected.domain}
                </p>
                <p>
                  <b>Duration:</b> {selected.duration}
                </p>
                <p>
                  <b>DOB:</b> {formatDate(selected.dob)}
                </p>
                <p>
                  <b>College:</b> {selected.college}
                </p>
                <p className="md:col-span-2">
                  <b>Address:</b> {selected.address}
                </p>
              </div>

              {/* Internship & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <p>
                  <b>Payment Checked:</b>{" "}
                  {selected.paymentChecked ? "Yes" : "No"}
                </p>
                <p>
                  <b>Email Confirmed:</b>{" "}
                  {selected.emailConfirmed ? "Yes" : "No"}
                </p>
                <p>
                  <b>Offer Sent:</b>{" "}
                  {selected.offerSent ? "Yes" : "No"}
                </p>
                <p>
                  <b>Feedback Submitted:</b>{" "}
                  {selected.feedbackSubmitted ? "Yes" : "No"}
                </p>
                <p>
                  <b>Certificate Generated:</b>{" "}
                  {selected.certificateGenerated ? "Yes" : "No"}
                </p>
                <p>
                  <b>Certificate Sent:</b>{" "}
                  {selected.certificateSent ? "Yes" : "No"}
                </p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <p>
                  <b>Internship Start Date:</b>{" "}
                  {formatDate(selected.startDate)}
                </p>
                <p>
                  <b>Internship End Date:</b>{" "}
                  {formatDate(selected.endDate)}
                </p>
                <p>
                  <b>Payment Created At:</b>{" "}
                  {formatDate(selected.payment?.createdAt)}
                </p>
                <p>
                  <b>Feedback Submitted At:</b>{" "}
                  {formatDate(selected.feedbackSubmittedAt)}
                </p>
                <p>
                  <b>Certificate Generated At:</b>{" "}
                  {formatDate(selected.certificateGeneratedAt)}
                </p>
                <p>
                  <b>Certificate Sent At:</b>{" "}
                  {formatDate(selected.certificateSentAt)}
                </p>
              </div>

              {/* Links */}
              <div className="mt-3 space-y-2">
                <p>
                  <b>LinkedIn:</b>{" "}
                  {selected.linkedin ? (
                    <a
                      href={selected.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selected.linkedin}
                    </a>
                  ) : (
                    "NA"
                  )}
                </p>
                <p>
                  <b>GitHub:</b>{" "}
                  {selected.github ? (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selected.github}
                    </a>
                  ) : (
                    "NA"
                  )}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-5 py-3 border-t bg-gray-50">
              <button
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;