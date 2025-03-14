"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, isDarkMode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed inset-y-0 left-0 w-64 shadow-lg lg:translate-x-0 lg:static z-50 p-4 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"
          }`}
        >
          <div className="flex justify-between lg:justify-center">
            <span className="text-xl font-bold">Admin Panel</span>
            <button
              className="lg:hidden"
              onClick={toggleSidebar}
              aria-label="Close Sidebar"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-4 space-y-2">
            {["dashboard", "users", "settings"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="block px-4 py-2 hover:bg-gray-700 transition-colors rounded-md"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Navbar Component
const Navbar = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const { isSignedIn } = useUser();

  return (
    <nav
      className={`shadow-md sticky top-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center transition-all ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        className="lg:hidden"
        onClick={toggleSidebar}
        aria-label="Open Sidebar"
      >
        <Menu size={24} />
      </button>
      <Link href="/" className="text-2xl font-bold">
        Admin Dashboard
      </Link>
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal" />
        )}
        <button
          onClick={toggleDarkMode}
          className="p-2 transition-all hover:scale-110"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

// Sales Report Component
const SalesReport = () => {
  const data = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

// Revenue Line Chart Component
const RevenueLineChart = () => {
  const data = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
    { month: "Jul", revenue: 3490 },
  ];

  return (
    <div className="w-full max-w-[250px] h-[200px] overflow-hidden">
      <LineChart
        width={250}
        height={180}
        data={data}
        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={10} />
        <YAxis fontSize={10} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </div>
  );
};

// Dashboard UI Component
const DashboardUI = () => {
  const cards = [
    { title: "Total Sales", value: "$50,000" },
    { title: "Total Orders", value: "1,200" },
    { title: "New Customers", value: "320" },
    {
      title: "Total Revenue",
      value: "$120,000",
      component: <RevenueLineChart />,
    },
    {
      title: "Sales Report",
      value: "View Details",
      component: <SalesReport />,
    },
    { title: "Total Reviews", value: "4,800" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center text-center"
        >
          <h3 className="text-lg font-bold mb-2">{card.title}</h3>
          {card.component ? (
            card.component
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-xl font-semibold">
              {card.value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// User Activity Log Component
const UserActivity = () => {
  const activities = [
    "User John Doe signed in",
    "Admin updated settings",
    "New order placed",
    "User Jane Smith signed out",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
      <ul className="text-sm text-gray-600 dark:text-gray-300">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="py-1 border-b border-gray-200 dark:border-gray-700"
          >
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Layout Component
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="p-4 flex-1 overflow-y-auto">
          <DashboardUI />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
