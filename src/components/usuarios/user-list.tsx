"use client";

import { useState } from "react";
import { UserCard } from "./user-card";
import { ListFilter } from "lucide-react";

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

const mockUsuarios: Usuario[] = [
  {
    id: "JG",
    nome: "José Ricardo Gomes",
    idade: 51,
    genero: "Homem",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Ativo",
    tipo: "Usuário padrão",
  },
  {
    id: "HS",
    nome: "Helena Soares",
    idade: 46,
    genero: "Mulher",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Inativo",
    tipo: "Usuário padrão",
  },
  {
    id: "DS",
    nome: "Débora Santana",
    idade: 24,
    genero: "Mulher",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Inativo",
    tipo: "Usuário padrão",
  },
  {
    id: "LS",
    nome: "Lucas Rocha Silveira",
    idade: 31,
    genero: "Homem",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Ativo",
    tipo: "Usuário padrão",
  },
  {
    id: "SA",
    nome: "Sérgio Arantes",
    idade: 36,
    genero: "Homem",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Ativo",
    tipo: "Usuário padrão",
  },
  {
    id: "AC",
    nome: "Adriano Costa",
    idade: 38,
    genero: "Homem",
    dataRegistro: "22/03/2025 - 10:21am",
    tempoSessao: "38m22s",
    status: "Ativo",
    tipo: "Usuário padrão",
  },
];

export function UserList() {
  const [usuarios] = useState<Usuario[]>(mockUsuarios);

  // Métricas
  const totalUsuarios = "294"; // Número fixo para corresponder à imagem
  const usuariosAtivos = "203";
  const usuariosInativos = "127";
  const tempoMedioSessao = "31m 20s";

  return (
    <div className="space-y-5">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-10">
        <div className="bg-[#FAFAFA] rounded-lg border border-gray-200 p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Usuários</p>
          <p className="text-[30px] font-normal font-serif">{totalUsuarios}</p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg border border-gray-200 p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">
            Tempo de sessão
          </p>
          <p className="text-[30px] font-normal font-serif">
            {tempoMedioSessao}
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg border border-gray-200 p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Ativos</p>
          <p className="text-[30px] font-normal font-serif">{usuariosAtivos}</p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg border border-gray-200 p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Inativos</p>
          <p className="text-[30px] font-normal font-serif">
            {usuariosInativos}
          </p>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="relative mb-5 px-10 flex items-center">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.79167 13.4583C10.9213 13.4583 13.4583 10.9213 13.4583 7.79167C13.4583 4.66205 10.9213 2.125 7.79167 2.125C4.66205 2.125 2.125 4.66205 2.125 7.79167C2.125 10.9213 4.66205 13.4583 7.79167 13.4583Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.875 14.875L11.7938 11.7938"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none text-sm font-sans"
          />
        </div>
        <button className="ml-3 bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
          <ListFilter className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
        </button>
      </div>

      {/* Lista de usuários em cards */}
      <div className="space-y-2 px-10 font-sans">
        {usuarios.map((usuario) => (
          <UserCard key={usuario.id} usuario={usuario} />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between mt-5 px-10 font-sans">
        <span className="text-[14px] text-gray-500">5 de 294 itens</span>

        <div className="flex items-center gap-1">
          <button className="px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M9.5 11L6.5 8L9.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Anterior
          </button>
          <button className="min-w-6 h-6 flex items-center justify-center text-[14px] bg-primary text-white rounded px-2 cursor-pointer">
            1
          </button>
          <button className="min-w-6 h-6 flex items-center justify-center text-[14px] text-gray-500 px-2 hover:bg-gray-50 cursor-pointer transition-colors rounded">
            2
          </button>
          <span className="text-gray-500">...</span>
          <button className="min-w-6 h-6 flex items-center justify-center text-[14px] text-gray-500 px-2 hover:bg-gray-50 cursor-pointer transition-colors rounded">
            58
          </button>
          <button className="px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded">
            Próxima
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M6.5 11L9.5 8L6.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-500">Itens por página:</span>
          <select className="border border-gray-200 rounded px-2 py-1 text-[14px] cursor-pointer">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
