import Sidebar from "./Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-white shadow flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-blue-900 md:hidden">SIGEA</h1>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              className="cursor-pointer border-0 bg-transparent p-0"
              id="dropdown-user"
              onClick={(e) => e.preventDefault()}
            >
              <FaUserCircle size={30} className="text-blue-800" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Perfil</Dropdown.Item>
              <Dropdown.Item href="#">Configuración</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </header>

        <main className="px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
