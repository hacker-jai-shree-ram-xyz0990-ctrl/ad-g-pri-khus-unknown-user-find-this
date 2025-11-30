import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import API from "../api/adminApi";

import {
  Users,
  Briefcase,
  IndianRupee,
  FileBadge2,
  CreditCard,
  PieChart as PieIcon,
} from "lucide-react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#9333ea", "#eab308", "#dc2626", "#0ea5e9"];

const Dashboard = () => {
  const [overviewCards, setOverviewCards] = useState(null);
  const [paymentsSummary, setPaymentsSummary] = useState(null);
  const [serverTimeIST, setServerTimeIST] = useState(null);

  const [granularity, setGranularity] = useState("daily"); // daily | monthly | yearly
  const [rangeValue, setRangeValue] = useState("30"); // meaning depends on granularity

  const [registrationsSeries, setRegistrationsSeries] = useState([]);
  const [paymentsSeries, setPaymentsSeries] = useState([]);
  const [domainData, setDomainData] = useState([]);
  const [durationData, setDurationData] = useState([]);
  const [paymentStatusData, setPaymentStatusData] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // 1) Overview (cards + payment summary)
      const overviewRes = await API.get("/analytics/overview");
      setOverviewCards(overviewRes.data.data.overviewCards);
      setPaymentsSummary(overviewRes.data.data.paymentsSummary);
      setServerTimeIST(overviewRes.data.data.serverTimeIST);

      // 2) Time-series (registrations & payments)
      const timeParams =
        granularity === "daily"
          ? { granularity, days: rangeValue }
          : granularity === "monthly"
          ? { granularity, months: rangeValue }
          : { granularity, years: rangeValue };

      const timeseriesRes = await API.get("/analytics/timeseries", {
        params: timeParams,
      });

      const tsData = timeseriesRes.data.data;
      setRegistrationsSeries(tsData.applicantsSeries || []);
      setPaymentsSeries(tsData.paymentsSeries || []);

      // 3) Domain & duration wise
      const domainRes = await API.get("/analytics/domains");
      setDomainData(domainRes.data.data.domains || []);
      setDurationData(domainRes.data.data.durations || []);

      // 4) Payment status pie
      const paymentRes = await API.get("/analytics/payments");
      setPaymentStatusData(paymentRes.data.data.byStatus || []);
      // paymentRes.data.data.summary is already in overview route, but could be reused
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [granularity, rangeValue]);

  const rangeLabel = () => {
    if (granularity === "daily") return `Last ${rangeValue} days`;
    if (granularity === "monthly") return `Last ${rangeValue} months`;
    return `Last ${rangeValue} years`;
  };

  const rangeOptions = () => {
    if (granularity === "daily") {
      return [
        { value: "7", label: "7 days" },
        { value: "30", label: "30 days" },
        { value: "90", label: "90 days" },
      ];
    }
    if (granularity === "monthly") {
      return [
        { value: "3", label: "3 months" },
        { value: "6", label: "6 months" },
        { value: "12", label: "12 months" },
      ];
    }
    return [
      { value: "1", label: "1 year" },
      { value: "3", label: "3 years" },
      { value: "5", label: "5 years" },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-900">
      {loading && <PreLoader />}
      <AdminNavbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>

            {/* Granularity & Range Controls */}
            <div className="flex items-center gap-3 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Granularity
                </label>
                <select
                  value={granularity}
                  onChange={(e) => setGranularity(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Duration
                </label>
                <select
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  {rangeOptions().map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-gray-500 mt-4 sm:mt-6">
                Showing: <span className="font-semibold">{rangeLabel()}</span>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          {overviewCards && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard
                title="Total Applicants"
                value={overviewCards.totalApplicants}
                icon={<Users className="text-blue-600" />}
              />
              <DashboardCard
                title="Total Internships"
                value={overviewCards.totalInternships}
                icon={<Briefcase className="text-green-600" />}
              />
              <DashboardCard
                title="Certificates Issued"
                value={overviewCards.totalCertificates}
                icon={<FileBadge2 className="text-purple-600" />}
              />
              <DashboardCard
                title="Total Revenue"
                value={`₹${overviewCards.totalRevenue}`}
                icon={<IndianRupee className="text-yellow-600" />}
              />
            </div>
          )}

          {/* Payment summary cards */}
          {paymentsSummary && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DashboardCard
                title="Total Payments"
                value={paymentsSummary.totalPayments}
                icon={<CreditCard className="text-indigo-600" />}
              />
              <DashboardCard
                title="Captured Payments"
                value={paymentsSummary.capturedPayments}
                icon={<CreditCard className="text-emerald-600" />}
              />
              <DashboardCard
                title="Non-Captured Payments"
                value={paymentsSummary.nonCapturedPayments}
                icon={<CreditCard className="text-rose-600" />}
              />
            </div>
          )}

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registrations chart */}
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-3">
                User Registrations ({granularity})
              </h2>

              {registrationsSeries?.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={registrationsSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 text-sm mt-10">
                  No registration data available
                </p>
              )}
            </div>

            {/* Payments over time */}
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-3">
                Payments Over Time ({granularity})
              </h2>

              {paymentsSeries?.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={paymentsSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="totalAmount"
                      name="Total Amount (₹)"
                      fill="#16a34a"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="count"
                      name="No. of Payments"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 text-sm mt-10">
                  No payment data available
                </p>
              )}
            </div>
          </div>

          {/* Domain-wise & Duration-wise */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Domain-wise Applicants */}
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-3">
                Domain-wise Applicants
              </h2>

              {domainData?.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={domainData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      nameKey="domain"
                      label={(entry) => entry.domain}
                    >
                      {domainData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 text-sm mt-10">
                  No domain stats available
                </p>
              )}
            </div>

            {/* Duration-wise Applicants */}
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <h2 className="text-sm font-semibold mb-3">
                Duration-wise Applicants
              </h2>

              {durationData?.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={durationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#9333ea"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 text-sm mt-10">
                  No duration stats available
                </p>
              )}
            </div>
          </div>

          {/* Payment Status Pie */}
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <PieIcon className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-semibold">
                Payment Status Distribution
              </h2>
            </div>

            {paymentStatusData?.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="count"
                    nameKey="status"
                    label={(entry) => entry.status}
                  >
                    {paymentStatusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 text-sm mt-10">
                No payment status data available
              </p>
            )}
          </div>

          {/* Server Time */}
          <div className="bg-white border rounded-lg p-4 shadow-sm text-sm">
            <strong>Server Time (IST):</strong> {serverTimeIST || "Updating..."}
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <div className="p-4 bg-white rounded-xl border shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-500 uppercase">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
    <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
  </div>
);

export default Dashboard;