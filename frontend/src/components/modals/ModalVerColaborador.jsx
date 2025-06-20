import React from "react";

export default function ModalVerColaborador({ colaborador, onClose }) {
  if (!colaborador) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Detalle del Colaborador</h3>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Equipo asignado:</strong> {colaborador.equipo || "Ninguno"}</p>

          <div>
            <strong>Sistemas asignados:</strong>
            {colaborador.sistemas && colaborador.sistemas.length > 0 ? (
              <ul className="list-disc pl-5 mt-1">
                {colaborador.sistemas.map((sistema, index) => (
                  <li key={index}>{sistema}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1">Ninguno</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
