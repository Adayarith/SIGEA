import { FaHome, FaUsers, FaLaptop, FaServer, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Sidebar() {
  return (
    <aside className="w-45 bg-gray-300 shadow h-screen p-4 hidden md:block">
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="mx-auto w-40 h-20" />
        {/* Texto violeta para "SIGEA" */}
        <h1 className="text-2xl font-bold mt-4 text-violet-700">SIGEA</h1>
      </div>

      <nav className="space-y-4">
        <SidebarLink to="/dashboard" icon={<FaHome />} label="Inicio" />
        <SidebarLink to="/colaboradores" icon={<FaUsers />} label="Colaboradores" />
        <SidebarLink to="/equipos" icon={<FaLaptop />} label="Equipos" />
        <SidebarLink to="/sistemas" icon={<FaServer />} label="Sistemas" />
        <SidebarLink to="/resguardos" icon={<FaFileAlt />} label="Resguardos" />
      </nav>
    </aside>
  );
}

function SidebarLink({ icon, label, to }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 text-black 
                 hover:text-violet-900 
                 hover:bg-violet-500 
                 rounded-md 
                 px-2 
                 py-1 
                 transition duration-300 ease-in-out"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
