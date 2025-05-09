"use client";

import { useState } from "react";

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
    <div className="space-y-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Usuários</p>
          <p className="text-2xl font-semibold">{totalUsuarios}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Tempo de sessão</p>
          <p className="text-2xl font-semibold">{tempoMedioSessao}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Ativos</p>
          <p className="text-2xl font-semibold">{usuariosAtivos}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">Inativos</p>
          <p className="text-2xl font-semibold">{usuariosInativos}</p>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="relative mb-4">
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
          className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none text-sm"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14M6.66667 8H14M11.3333 12H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Lista de usuários em cards */}
      <div className="space-y-2">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium">
                {usuario.id}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{usuario.nome}</h3>
                <div className="text-sm text-gray-500 mt-0.5">
                  {usuario.idade} anos, {usuario.genero}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  usuario.status === "Ativo"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {usuario.status}
              </span>
              <button className="ml-6 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99998C10.8334 9.53974 10.4603 9.16665 10 9.16665C9.53978 9.16665 9.16669 9.53974 9.16669 9.99998C9.16669 10.4602 9.53978 10.8333 10 10.8333Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.8334 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 9.99998C16.6667 9.53974 16.2936 9.16665 15.8334 9.16665C15.3731 9.16665 15 9.53974 15 9.99998C15 10.4602 15.3731 10.8333 15.8334 10.8333Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16669 10.8333C4.62693 10.8333 5.00002 10.4602 5.00002 9.99998C5.00002 9.53974 4.62693 9.16665 4.16669 9.16665C3.70645 9.16665 3.33336 9.53974 3.33336 9.99998C3.33336 10.4602 3.70645 10.8333 4.16669 10.8333Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-500">5 de 294 itens</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Itens por página:</span>
          <select className="border border-gray-200 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 text-sm text-gray-500 flex items-center">
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
          <button className="min-w-6 h-6 flex items-center justify-center text-sm bg-primary text-white rounded px-2">
            1
          </button>
          <button className="min-w-6 h-6 flex items-center justify-center text-sm text-gray-500 px-2">
            2
          </button>
          <span className="text-gray-500">...</span>
          <button className="min-w-6 h-6 flex items-center justify-center text-sm text-gray-500 px-2">
            58
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 flex items-center">
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
      </div>
    </div>
  );
}
