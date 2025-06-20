import { useState, useEffect } from "react";
import { FaLaptop, FaUser, FaKey, FaFileAlt, FaPowerOff, FaHome, FaCog } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Modal, Button } from "react-bootstrap";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    navigate("/login"); 
  };

  return (
    <>
      <aside className={`bg-blue-900 text-white h-screen fixed left-0 top-0 z-40 shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        {/* LOGO */}
        <div className={`flex items-center ${isOpen ? "justify-start pl-4" : "justify-center"}`}>
          {isOpen ? (
            <img src={logo} alt="SIGEA Logo" className="w-40 h-auto" />
          ) : (
            <img src={logo}  lt="SIGEA Logo" className="w-10 h-auto" />
          )}
        </div>     

        {/* NAVEGACIÓN */}
        <nav className="flex flex-col py-4 px-2 space-y-1">
          <NavItem icon={<FaHome />} label="Inicio" isOpen={isOpen} to="/" active={location.pathname === "/"} />
          <NavItem icon={<FaUser />} label="Colaboradores" isOpen={isOpen} to="/colaboradores" active={location.pathname.includes("colaboradores")} />
          <NavItem icon={<FaLaptop />} label="Equipos" isOpen={isOpen} to="/equipos" active={location.pathname.includes("equipos")} />
          <NavItem icon={<FaKey />} label="Sistemas y Accesos" isOpen={isOpen} to="/sistemas" active={location.pathname.includes("sistemas")} />
          <NavItem icon={<FaFileAlt />} label="Resguardos" isOpen={isOpen} to="/resguardos" active={location.pathname.includes("resguardos")} />
        </nav>

        {/* CONFIGURACIÓN Y CERRAR SESIÓN */}
        <div className="absolute bottom-0 w-full px-2 py-4 border-t border-blue-800 space-y-1">
          <NavItem icon={<FaCog />} label="Configuración" isOpen={isOpen} to="/configuracion" active={location.pathname.includes("configuracion")} />
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-right gap-3 px-4 py-2 rounded-md transition hover:text-red-300 text-red-400 w-full"
          >
            <span className="text-lg"><FaPowerOff /></span>
            {isOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* MODAL DE CONFIRMACIÓN */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header >
          <Modal.Title>Confirmar cierre de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas cerrar sesión? Se cerrará tu sesión actual y volverás a la pantalla de inicio.
        </Modal.Body>
        <Modal.Footer00>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Modal.Footer00>
      </Modal>

    </>
  );
}

function NavItem({ icon, label, isOpen, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${active ? "bg-blue-800 text-white font-semibold" : "hover:bg-blue-800 text-gray-300"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {isOpen && <span>{label}</span>}
    </Link>
  );
}
