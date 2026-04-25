import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Home,
  Calendar,
  BookOpen,
  Settings,
  Clock,
  Search,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import logo from "@/imports/LEARNHUB-GOLD.png";
import { useAuth } from "../hooks/useAuth";
import PortalLayout from "../components/portal/PortalLayout";
import { portalCardClass } from "../components/portal/PortalCard";
import PortalHeader from "../components/portal/PortalHeader";
import PortalSidebar from "../components/portal/PortalSidebar";

const STUDENT_NAV_ITEMS = [
  { icon: Home, label: "Dashboard", view: "dashboard" },
  { icon: Calendar, label: "Attendance", view: "attendance" },
  { icon: BookOpen, label: "Courses", view: "courses" },
  { icon: Settings, label: "Settings", view: "settings" },
] as const;

const STUDENT_ATTENDANCE_HISTORY = [
  { id: 1, date: "2026-04-11", timeIn: "09:00 AM", timeOut: "12:00 PM", subject: "SE102 - Software Engineering" },
  { id: 2, date: "2026-04-11", timeIn: "01:00 PM", timeOut: "03:00 PM", subject: "DM104 - Data Management" },
  { id: 3, date: "2026-04-10", timeIn: "09:00 AM", timeOut: "11:00 AM", subject: "STAT1 - Statistics I" },
  { id: 4, date: "2026-04-10", timeIn: "02:00 PM", timeOut: "04:00 PM", subject: "AL102 - Algorithm Design" },
  { id: 5, date: "2026-04-09", timeIn: "09:00 AM", timeOut: "12:00 PM", subject: "SE102 - Software Engineering" },
  { id: 6, date: "2026-04-09", timeIn: "01:00 PM", timeOut: "03:00 PM", subject: "GV101 - Graphic & Visual Computing" },
  { id: 7, date: "2026-04-08", timeIn: "09:00 AM", timeOut: "11:00 AM", subject: "SIA101 - Systems Integration" },
  { id: 8, date: "2026-04-08", timeIn: "02:00 PM", timeOut: "04:00 PM", subject: "DM104 - Data Management" },
  { id: 9, date: "2026-04-07", timeIn: "09:00 AM", timeOut: "12:00 PM", subject: "SE102 - Software Engineering" },
  { id: 10, date: "2026-04-07", timeIn: "01:00 PM", timeOut: "03:00 PM", subject: "STAT1 - Statistics I" },
];

export default function StudentPortal() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [activeView, setActiveView] = useState("dashboard");
  const [isTimedIn, setIsTimedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.type !== "student") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.type !== "student") {
    return null;
  }

  const studentData = {
    name: currentUser.name,
    role: "Computer Science Student",
    email: `${currentUser.id.toLowerCase().replace("-", "")}@intelearnhub.com`,
    studentId: currentUser.id,
    year: "3rd Year",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  };

  const filteredHistory = useMemo(
    () =>
      STUDENT_ATTENDANCE_HISTORY.filter(
        (record) =>
          record.date.includes(searchTerm) ||
          record.subject.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = useMemo(
    () => filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredHistory, currentPage]
  );

  const handleTimeIn = () => {
    setIsTimedIn(true);
  };

  const handleTimeOut = () => {
    setIsTimedIn(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderDashboard = () => (
    <>
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={portalCardClass}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              Welcome, {studentData.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              {isTimedIn ? "You are currently Timed In" : "Ready to attend your classes?"}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            View Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Time In/Out Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={portalCardClass}
      >
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-[#d4af37]" />
          <h3 className="text-2xl font-bold text-black">Time Logging</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTimeIn}
            disabled={isTimedIn}
            className={`p-8 rounded-xl border-2 transition-all duration-300 ${
              isTimedIn
                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-[#d4af37] to-[#f0c24b] border-[#d4af37] text-black font-bold hover:shadow-xl"
            }`}
          >
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Time In</div>
              <div className="text-sm opacity-80">
                {isTimedIn ? "Already timed in" : "Click to mark attendance"}
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTimeOut}
            disabled={!isTimedIn}
            className={`p-8 rounded-xl border-2 transition-all duration-300 ${
              !isTimedIn
                ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-black to-gray-800 border-black text-white font-bold hover:shadow-xl"
            }`}
          >
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Time Out</div>
              <div className="text-sm opacity-80">
                {!isTimedIn ? "Time in first" : "Click to mark departure"}
              </div>
            </div>
          </motion.button>
        </div>

        {isTimedIn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg"
          >
            <div className="flex items-center gap-2 text-black">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold">Status: Active - Timed In at {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Attendance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={portalCardClass}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Recent Attendance</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search date or subject..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-300"
            />
          </div>
        </div>

        <div className="max-h-[24rem] overflow-auto rounded-lg border border-border">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-background">
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Date</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Time In</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Time Out</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Subject</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-border/70 hover:bg-muted/50 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-foreground font-medium">{record.date}</td>
                  <td className="py-4 px-4 text-muted-foreground">{record.timeIn}</td>
                  <td className="py-4 px-4 text-muted-foreground">{record.timeOut}</td>
                  <td className="py-4 px-4 text-muted-foreground">{record.subject}</td>
                </motion.tr>
              ))}
              {paginatedHistory.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No attendance records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredHistory.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} records
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous attendance page"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg transition-colors duration-300 ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground border-accent font-semibold"
                    : "border-border hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next attendance page"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );

  const renderAttendance = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={portalCardClass}
    >
      <h2 className="text-3xl font-bold text-black mb-6">Full Attendance Records</h2>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search date or subject..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-4 text-gray-600 font-semibold">Date</th>
              <th className="text-left py-4 px-4 text-gray-600 font-semibold">Time In</th>
              <th className="text-left py-4 px-4 text-gray-600 font-semibold">Time Out</th>
              <th className="text-left py-4 px-4 text-gray-600 font-semibold">Subject</th>
              <th className="text-left py-4 px-4 text-gray-600 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((record, index) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-4 text-black font-medium">{record.date}</td>
                <td className="py-4 px-4 text-gray-700">{record.timeIn}</td>
                <td className="py-4 px-4 text-gray-700">{record.timeOut}</td>
                <td className="py-4 px-4 text-gray-700">{record.subject}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Present
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderCourses = () => {
    const courses = [
      { code: "SE102", name: "Software Engineering", instructor: "Dr. Anderson", schedule: "Mon, Wed 9:00 AM" },
      { code: "DM104", name: "Data Management", instructor: "Prof. Williams", schedule: "Tue, Thu 2:00 PM" },
      { code: "STAT1", name: "Statistics I", instructor: "Dr. Martinez", schedule: "Mon, Wed 2:00 PM" },
      { code: "AL102", name: "Algorithm Design", instructor: "Prof. Chen", schedule: "Tue, Thu 10:00 AM" },
      { code: "GV101", name: "Graphic & Visual Computing", instructor: "Dr. Rodriguez", schedule: "Fri 1:00 PM" },
      { code: "SIA101", name: "Systems Integration", instructor: "Prof. Johnson", schedule: "Wed, Fri 10:00 AM" }
    ];

    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={portalCardClass}
        >
          <h2 className="text-3xl font-bold text-black mb-6">My Courses</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#d4af37]/5 to-transparent border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 bg-[#d4af37] text-black rounded-lg font-mono text-sm font-semibold">
                    {course.code}
                  </div>
                  <BookOpen className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{course.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {course.schedule}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={portalCardClass}
    >
      <h2 className="text-3xl font-bold text-black mb-6">Account Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-black mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={studentData.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                defaultValue={studentData.studentId}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={studentData.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Level</label>
              <input
                type="text"
                defaultValue={studentData.year}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold text-black mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button className="px-8 py-3 bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#f0c24b] transition-colors duration-300">
            Save Changes
          </button>
          <button className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <PortalLayout>
      <PortalSidebar
        title="Student Portal"
        logoSrc={logo}
        navItems={[...STUDENT_NAV_ITEMS]}
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <motion.div initial={shouldReduceMotion ? false : { y: -100 }} animate={shouldReduceMotion ? undefined : { y: 0 }} transition={{ duration: 0.5 }}>
          <PortalHeader
            title="Student Dashboard"
            subtitle={`Welcome back, ${studentData.name}`}
            avatar={studentData.avatar}
            name={studentData.name}
            meta={studentData.studentId}
            onProfileClick={() => setShowProfile((prev) => !prev)}
          />
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 bg-muted p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeView === "dashboard" && renderDashboard()}
            {activeView === "attendance" && renderAttendance()}
            {activeView === "courses" && renderCourses()}
            {activeView === "settings" && renderSettings()}
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowProfile(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Student profile details"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-border"
          >
            <div className="text-center">
              <img
                src={studentData.avatar}
                alt={studentData.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-accent object-cover"
              />
              <h3 className="text-3xl font-bold text-foreground mb-2">{studentData.name}</h3>
              <p className="text-accent font-semibold mb-6">{studentData.role}</p>

              <div className="space-y-4 text-left bg-muted p-6 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Student ID</div>
                  <div className="font-semibold text-foreground">{studentData.studentId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-semibold text-foreground">{studentData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Year Level</div>
                  <div className="font-semibold text-foreground">{studentData.year}</div>
                </div>
              </div>

              <button
                onClick={() => setShowProfile(false)}
                className="mt-6 w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-[#b08d18] hover:text-primary-foreground transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </PortalLayout>
  );
}

