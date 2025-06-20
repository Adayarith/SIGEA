import { useState, useEffect } from "react";

export function ModalAcceso({
  isOpen,
  onClose,
  onSave,
  acceso,
  nombresDisponibles = [],
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (acceso) {
      setNombre(acceso.nombre);
      setDescripcion(acceso.descripcion);
      setTipo(acceso.tipo || "");
    } else {
      setNombre("");
      setDescripcion("");
      setTipo("");
    }
  }, [acceso]);

  const handleSubmit = () => {
    if (!nombre.trim()) {
      alert("Debes seleccionar un sistema.");
      return;
    }

    onSave({ nombre, descripcion, tipo });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          {acceso ? "Editar Acceso" : "Agregar Sistema"}
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del sistema
            </label>
            <select
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="">Seleccionar sistema</option>
              {nombresDisponibles.map((n, i) => (
                <option key={i} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de sistema
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="">Seleccionar tipo</option>
              <option value="Web">Web</option>
              <option value="Desktop">Desktop</option>
              <option value="Móvil">Móvil</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-900"
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
