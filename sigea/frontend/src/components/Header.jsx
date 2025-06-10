import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle, FaBell } from "react-icons/fa";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Se cierra menú de notificaciones al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    "Nuevo colaborador registrado",
    "Equipo asignado correctamente",
    "Se generó un nuevo resguardo",
  ];

  return (
    <header className="bg-violet-500 text-white shadow-md flex items-center justify-end px-6 h-16 space-x-6 relative">
      {/* Campana de notificaciones */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-white relative hover:text-violet-200 transition"
        >
          <FaBell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full animate-ping" />
        </button>

        {showNotifications && (
          <div className="absolute right-10 mt-2 w-64 bg-white text-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b font-semibold text-violet-700">
              Notificaciones
            </div>
            <ul className="max-h-60 overflow-y-auto text-sm divide-y">
              {notifications.map((msg, i) => (
                <li key={i} className="px-4 py-2 hover:bg-violet-100 cursor-pointer">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Usuario desplegable */}
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="link"
          id="dropdown-user"
          className="text-white d-flex align-items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <FaUserCircle size={24} />
        </Dropdown.Toggle>

        <Dropdown.Menu className="bg-violet-500 border-0">
          <Dropdown.Item href="#perfil" className="text-white hover:bg-violet-800">
            Perfil
          </Dropdown.Item>
          <Dropdown.Item href="#configuracion" className="text-white hover:bg-violet-800">
            Configuración
          </Dropdown.Item>
          <Dropdown.Divider className="border-violet-800" />
          <Dropdown.Item href="#cerrar-sesion" className="text-white hover:bg-violet-800">
            Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}
