import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSideNav, setActiveSideNav] = useState("dashboard");

  return (
    <div className="bg-[#07070d] min-h-screen text-white">
      <div className="flex-shrink-0 h-16">
        <Navbar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setActiveCategory("all"); // page change হলে category reset
          }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSideNav={activeSideNav}
          setActiveSideNav={setActiveSideNav}
        />

        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            collapsed ? "pl-16" : "pl-60"
          }`}
        >
          <Outlet context={{ activePage, activeCategory, setActiveCategory }} />
        </main>
      </div>
    </div>
  );
}