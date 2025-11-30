import { useEffect, useState, useMemo } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import {
  Search,
  Trash2,
  CreditCard,
  Eye,
  X,
  Phone,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Globe,
  Github,
} from "lucide-react";
import { formatIST } from "../utils/istTime";
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
} from "recharts";

const STATUS_COLORS = {
  captured: "text-green-600 font-semibold",
  success: "text-green-600 font-semibold",
  created: "text-yellow-600 font-semibold",
  pending: "text-yellow-600 font-semibold",
  failed: "text-red-600 font-semibold",
  refunded: "text-blue-600 font-semibold",
};

const PIE_COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#a855f7"];

const Payments = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/payments?search=${search}&page=${page}&limit=${limit}`
      );

      setPayments(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch {
      showToast("Failed to load payments!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPayments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment record?")) return;
    try {
      await API.delete(`/payments/${id}`);
      showToast("Payment removed!", "success");
      fetchPayments();
    } catch {
      showToast("Unable to delete!", "error");
    }
  };

  const handleOpenDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseDetails = () => {
    setSelectedPayment(null);
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // --------- Analytics (Charts & Stats) ---------

  const {
    dateChartData,
    statusPieData,
    totalAmount,
    totalCount,
    capturedCount,
  } = useMemo(() => {
    const dateMap = {};
    const statusMap = {};
    let totalAmt = 0;
    let count = 0;
    let captured = 0;

    payments.forEach((p) => {
      count += 1;
      const amt = Number(p.amount || 0);
      totalAmt += amt;

      const statusKey = (p.status || "unknown").toLowerCase();
      statusMap[statusKey] = (statusMap[statusKey] || 0) + 1;
      if (statusKey === "captured" || statusKey === "success") captured += 1;

      const rawDate =
        p.paidAt || p.capturedAt || p.createdAt || p.createdAtIST || null;

      const dateObj = rawDate ? new Date(rawDate) : null;
      const label = dateObj
        ? dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : "Unknown";

      if (!dateMap[label]) {
        dateMap[label] = { date: label, count: 0, amount: 0 };
      }
      dateMap[label].count += 1;
      dateMap[label].amount += amt;
    });

    const dateChartData = Object.values(dateMap).sort((a, b) => {
      // simple sort by date label string; good enough for small admin views
      return a.date.localeCompare(b.date);
    });

    const statusPieData = Object.entries(statusMap).map(([key, value]) => ({
      name: key.toUpperCase(),
      value,
    }));

    return {
      dateChartData,
      statusPieData,
      totalAmount: totalAmt,
      totalCount: count,
      capturedCount: captured,
    };
  }, [payments]);

  // --------- Helpers for Details Modal ---------

  const safeFormatDate = (val) => {
    if (!val) return "NA";
    try {
      return formatIST(val);
    } catch {
      return new Date(val).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
    }
  };

  const getPrimaryPhone = (p) =>
    p?.applicantInfo?.phone ||
    p?.applicantData?.phone ||
    p?.phone ||
    "NA";

  const getPrimaryEmail = (p) =>
    p?.applicantEmail ||
    p?.applicantInfo?.email ||
    p?.applicantData?.email ||
    p?.email ||
    "NA";

  const getPrimaryName = (p) =>
    p?.applicantName ||
    p?.applicantInfo?.name ||
    p?.applicantData?.fullName ||
    p?.name ||
    "NA";

  const getDomain = (p) =>
    p?.domain || p?.applicantData?.domain || p?.rawOrder?.notes?.domain || "NA";

  const getDuration = (p) =>
    p?.duration ||
    p?.applicantData?.duration ||
    p?.rawOrder?.notes?.duration ||
    "NA";

  const getCollege = (p) =>
    p?.applicantData?.college || "NA";

  const getAddress = (p) =>
    p?.applicantData?.address || "NA";

  const getLinkedIn = (p) =>
    p?.applicantData?.linkedin || "";

  const getGithub = (p) =>
    p?.applicantData?.github || "";

  const getFeeAmount = (p) => {
    // You can adjust this logic based on how you treat paise/rupees
    if (p?.amount) return p.amount;
    if (p?.rawPayment?.amount) return p.rawPayment.amount;
    if (p?.rawOrder?.amount) return p.rawOrder.amount;
    return 0;
  };

  const getUPIVPA = (p) =>
    p?.rawPayment?.vpa || "NA";

  const getReceipt = (p) =>
    p?.rawOrder?.notes?.receipt || p?.rawOrder?.receipt || "NA";

  const getMethod = (p) =>
    p?.method || p?.rawPayment?.method || "NA";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Payments
            </h1>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2 shadow-sm"
            >
              <input
                type="text"
                placeholder="Search by name / email / uniqueId / domain"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none"
              />
              <button
                type="submit"
                className="text-blue-600 hover:text-blue-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Total Payments</span>
              <span className="text-2xl font-bold">{totalCount}</span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Total Amount</span>
              <span className="text-2xl font-bold">
                ₹{totalAmount || 0}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Captured / Success</span>
              <span className="text-2xl font-bold text-green-600">
                {capturedCount}
              </span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-500">Current Page</span>
              <span className="text-lg font-semibold">
                Page {page} of {totalPages}
              </span>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date-wise payments */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h2 className="text-sm font-semibold mb-3">
                Payments over Time (Current Page)
              </h2>
              {dateChartData.length === 0 ? (
                <p className="text-xs text-gray-500">No data to display.</p>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dateChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="Count"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        name="Amount (₹)"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Status pie chart */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h2 className="text-sm font-semibold mb-3">
                Payment Status Distribution
              </h2>
              {statusPieData.length === 0 ? (
                <p className="text-xs text-gray-500">No data to display.</p>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
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

          {/* Table */}
          <div className="overflow-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Duration</th>
                  <th className="p-2 border">Unique ID</th>
                  <th className="p-2 border">Fees Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Paid / Created On</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 && !loading && (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No payment found
                    </td>
                  </tr>
                )}

                {payments.map((p) => {
                  const name = getPrimaryName(p);
                  const phone = getPrimaryPhone(p);
                  const email = getPrimaryEmail(p);
                  const domain = getDomain(p);
                  const duration = getDuration(p);
                  const fees = getFeeAmount(p);
                  const statusKey = (p.status || "unknown").toLowerCase();
                  const statusClass =
                    STATUS_COLORS[statusKey] || "text-gray-700 font-medium";
                  const paidDate =
                    p.paidAt || p.capturedAt || p.createdAt || p.createdAtIST;

                  return (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{name}</td>
                      <td className="p-2 border whitespace-nowrap">
                        {phone}
                      </td>
                      <td className="p-2 border whitespace-nowrap">
                        {email}
                      </td>
                      <td className="p-2 border whitespace-nowrap">
                        {domain}
                      </td>
                      <td className="p-2 border whitespace-nowrap">
                        {duration}
                      </td>
                      <td className="p-2 border font-mono whitespace-nowrap">
                        {p?.uniqueId || "NA"}
                      </td>
                      <td className="p-2 border font-semibold whitespace-nowrap">
                        ₹{fees}
                      </td>
                      <td className={`p-2 border ${statusClass}`}>
                        {p.status || "NA"}
                      </td>
                      <td className="p-2 border whitespace-nowrap">
                        {safeFormatDate(paidDate)}
                      </td>
                      <td className="p-2 border text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenDetails(p)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Payment Details
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                    {selectedPayment._id}
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Created: {safeFormatDate(selectedPayment.createdAt)}
                </p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Top overview cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-3 border">
                  <p className="text-xs text-gray-500 mb-1">Applicant</p>
                  <p className="font-semibold text-sm flex items-center gap-1">
                    {getPrimaryName(selectedPayment)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {getPrimaryEmail(selectedPayment)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {getPrimaryPhone(selectedPayment)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border">
                  <p className="text-xs text-gray-500 mb-1">Internship</p>
                  <p className="text-sm font-semibold">
                    {getDomain(selectedPayment)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    Duration: {getDuration(selectedPayment)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Currency: {selectedPayment.currency || "INR"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border">
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <p className="text-lg font-bold">
                    ₹{getFeeAmount(selectedPayment)}
                  </p>
                  <p className="text-xs mt-1">
                    Status:{" "}
                    <span className="font-semibold">
                      {selectedPayment.status}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Order ID: {selectedPayment.razorpayOrderId || "NA"}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Payment ID: {selectedPayment.razorpayPaymentId || "NA"}
                  </p>
                </div>
              </div>

              {/* Applicant full info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border rounded-xl p-3 shadow-sm">
                  <h3 className="text-sm font-semibold mb-2">
                    Applicant Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">Full Name</span>
                      <p className="font-medium">
                        {getPrimaryName(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email</span>
                      <p className="font-medium">
                        {getPrimaryEmail(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone</span>
                      <p className="font-medium">
                        {getPrimaryPhone(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">DOB</span>
                      <p className="font-medium">
                        {safeFormatDate(
                          selectedPayment?.applicantData?.dob
                        )}
                      </p>
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Address
                      </span>
                      <p className="font-medium">
                        {getAddress(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        College
                      </span>
                      <p className="font-medium">
                        {getCollege(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        LinkedIn
                      </span>
                      {getLinkedIn(selectedPayment) ? (
                        <a
                          href={getLinkedIn(selectedPayment)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {getLinkedIn(selectedPayment)}
                        </a>
                      ) : (
                        <p className="font-medium">NA</p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Github className="w-3 h-3" />
                        GitHub
                      </span>
                      {getGithub(selectedPayment) ? (
                        <a
                          href={getGithub(selectedPayment)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {getGithub(selectedPayment)}
                        </a>
                      ) : (
                        <p className="font-medium">NA</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* High level payment info */}
                <div className="bg-white border rounded-xl p-3 shadow-sm">
                  <h3 className="text-sm font-semibold mb-2">
                    Payment Meta
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">Unique ID</span>
                      <p className="font-medium">
                        {selectedPayment.uniqueId || "NA"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Currency</span>
                      <p className="font-medium">
                        {selectedPayment.currency || "INR"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Receipt</span>
                      <p className="font-medium break-all">
                        {getReceipt(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Method</span>
                      <p className="font-medium">
                        {getMethod(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">UPI VPA</span>
                      <p className="font-medium break-all">
                        {getUPIVPA(selectedPayment)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Captured At</span>
                      <p className="font-medium">
                        {safeFormatDate(selectedPayment.capturedAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Created At</span>
                      <p className="font-medium">
                        {safeFormatDate(selectedPayment.createdAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Updated At</span>
                      <p className="font-medium">
                        {safeFormatDate(selectedPayment.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw Order & Payment JSON */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-black rounded-xl p-3 text-xs text-green-200 overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">
                      rawOrder
                    </h3>
                    <span className="text-[10px] bg-white/10 text-gray-200 px-2 py-0.5 rounded-full">
                      Razorpay Order Object
                    </span>
                  </div>
                  <div className="bg-black/70 rounded-lg p-2 overflow-auto max-h-64">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(
                        selectedPayment.rawOrder || {},
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>

                <div className="bg-black rounded-xl p-3 text-xs text-green-200 overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">
                      rawPayment
                    </h3>
                    <span className="text-[10px] bg-white/10 text-gray-200 px-2 py-0.5 rounded-full">
                      Razorpay Payment Object
                    </span>
                  </div>
                  <div className="bg-black/70 rounded-lg p-2 overflow-auto max-h-64">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(
                        selectedPayment.rawPayment || {},
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t bg-gray-50 flex justify-end">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-1.5 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
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

export default Payments;
