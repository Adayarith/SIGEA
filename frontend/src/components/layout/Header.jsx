import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

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
    { texto: "asignó un equipo a Edgar Gomez ", tiempo: "hace 2 h" },
    { texto: "agregó un nuevo acceso al sistema ABRHIL ", tiempo: "ayer" },
    { texto: "generó un nuevo resguardo para Luis Díaz ", tiempo: "hace 3 días" },
    { texto: "actualizó datos de colaborador David Ávila ", tiempo: "hace 1 semana" },
  ];

  return (
    <header className="w-full px-4 sm:px-8 py-3 bg-gray-100">
      <div className="bg-blue-900 text-white rounded-2xl shadow-md px-6 py-4 flex justify-between items-center">
        {/* Título */}
        <h1 className="text-lg sm:text-xl font-bold">Bienvenido a SIGEA</h1>

        {/* Notificaciones */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full shadow transition relative"
            title="Notificaciones"
          >
            <FaBell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-black">Notificaciones</h3>
                <div className="flex gap-4 mt-2 text-sm">
                  <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                    Todas
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    No leídas
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((msg, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="text-sm leading-snug">
                      <p className="text-black">
                        <span className="font-semibold">Sistema SIGEA</span>{" "}
                        {msg.texto}
                      </p>
                      <span className="text-blue-500 text-xs">{msg.tiempo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
