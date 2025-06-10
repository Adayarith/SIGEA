import { useState } from "react";

export function ModalEquipo({ isOpen, onClose, onSave, equipo }) {
  const [nombre, setNombre] = useState(equipo?.nombre || "");
  const [tipo, setTipo] = useState(equipo?.tipo || "");
  const [serie, setSerie] = useState(equipo?.serie || "");

  const handleSubmit = () => {
    onSave({ nombre, tipo, serie });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          {equipo ? "Editar Equipo" : "Agregar Equipo"}
        </h2>
        <input
          type="text"
          placeholder="Nombre del equipo"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de serie"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
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
