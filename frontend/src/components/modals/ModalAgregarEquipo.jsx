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
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          {equipo ? "Editar Equipo" : "Agregar Equipo"}
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Marca del equipo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de serie</label>
            <input
              type="text"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
