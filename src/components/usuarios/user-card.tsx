import React from "react";
import { Tag, User, Calendar, Clock, MoreHorizontal } from "lucide-react";

interface Usuario {
  id: string;
  nome: string;
  idade: number;
  genero: string;
  dataRegistro: string;
  tempoSessao: string;
  status: "Ativo" | "Inativo";
  tipo?: string;
}

export function UserCard({ usuario }: { usuario: Usuario }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 flex items-center h-[80px] p-0">
      <div className="flex flex-1 items-center">
        <div className="h-[56px] w-[56px] bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium text-base mx-[12px]">
          {usuario.id}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              {usuario.nome}
            </h3>
            <div className="flex items-center gap-1">
              <User size={16} className="text-gray-400" strokeWidth={1.5} />
              <span className="text-[12px] text-gray-500">
                {usuario.idade} anos, {usuario.genero}
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-[12px] text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-gray-400" strokeWidth={1.5} />
              {usuario.dataRegistro}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-gray-400" strokeWidth={1.5} />
              {usuario.tempoSessao}
            </div>
            <div className="flex items-center gap-1">
              <Tag size={14} className="text-gray-400" strokeWidth={1.5} />
              {usuario.tipo}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mr-[12px]">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-[12px] ${
            usuario.status === "Ativo"
              ? "bg-[#f4f4f5] text-gray-800"
              : "border border-[#f4f4f5] text-gray-800 bg-transparent"
          }`}
        >
          {usuario.status}
        </span>
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-50">
          <MoreHorizontal size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
