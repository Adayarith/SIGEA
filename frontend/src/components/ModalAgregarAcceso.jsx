import { useState, useEffect } from "react";

export function ModalAcceso({ isOpen, onClose, onSave, acceso }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (acceso) {
      setNombre(acceso.nombre);
      setDescripcion(acceso.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [acceso]);

  const handleSubmit = () => {
    if (nombre.trim() === "") {
      alert("El nombre es obligatorio.");
      return;
    }

    onSave({ nombre, descripcion });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          {acceso ? "Editar Acceso" : "Agregar Acceso"}
        </h2>
        <input
          type="text"
          placeholder="Nombre del sistema o acceso"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
