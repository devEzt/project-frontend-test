"use client";

import { useState } from "react";
import { UserCard } from "./user-card";
import { ListFilter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Usuario {
  id: string;
  nome: string;
  idade: number;
  genero: string;
  dataRegistro: string;
  tempoSessao: string;
  status: "Ativo" | "Inativo";
  tipo?: string;
  email?: string;
  telefone?: string;
  whatsapp?: boolean;
  cpf?: string;
  rg?: string;
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
    email: "jose.ricardo@exemplo.com",
    telefone: "(11) 98765-4321",
    whatsapp: true,
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
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
    email: "helena.soares@exemplo.com",
    telefone: "(11) 91234-5678",
    whatsapp: false,
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
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
    email: "debora.santana@exemplo.com",
    telefone: "(11) 99876-5432",
    whatsapp: true,
    cpf: "456.789.123-00",
    rg: "45.678.912-3",
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
    email: "lucas.rocha@exemplo.com",
    telefone: "(11) 94567-8912",
    whatsapp: false,
    cpf: "789.123.456-00",
    rg: "78.912.345-6",
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
    email: "sergio.arantes@exemplo.com",
    telefone: "(11) 92345-6789",
    whatsapp: true,
    cpf: "234.567.891-00",
    rg: "23.456.789-1",
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
    email: "adriano.costa@exemplo.com",
    telefone: "(11) 98765-1234",
    whatsapp: false,
    cpf: "567.891.234-00",
    rg: "56.789.123-4",
  },
];

interface UserListProps {
  onEditUsuario: (usuario: Usuario) => void;
}

export function UserList({ onEditUsuario }: UserListProps) {
  const [usuarios] = useState<Usuario[]>(mockUsuarios);

  const totalUsuarios = "294";
  const usuariosAtivos = "203";
  const usuariosInativos = "127";
  const tempoMedioSessao = "31m 20s";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-10">
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Usuários</p>
          <p className="text-[30px] font-normal font-serif">{totalUsuarios}</p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">
            Tempo de sessão
          </p>
          <p className="text-[30px] font-normal font-serif">
            {tempoMedioSessao}
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Ativos</p>
          <p className="text-[30px] font-normal font-serif">{usuariosAtivos}</p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-4 h-[100px] flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Inativos</p>
          <p className="text-[30px] font-normal font-serif">
            {usuariosInativos}
          </p>
        </div>
      </div>

      <div className="relative mb-5 px-10 flex items-center">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
            <Search size={17} />
          </div>
          <Input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none text-sm font-sans"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="ml-3 bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50"
        >
          <ListFilter className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="space-y-2 px-10 font-sans">
        {usuarios.map((usuario) => (
          <UserCard
            key={usuario.id}
            usuario={usuario}
            onEdit={() => onEditUsuario(usuario)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 px-10 font-sans">
        <span className="text-[14px] text-gray-500">5 de 294 itens</span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded h-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="default"
            className="min-w-6 h-6 flex items-center justify-center text-[14px] bg-primary text-white rounded px-2 cursor-pointer"
          >
            1
          </Button>
          <Button
            variant="ghost"
            className="min-w-6 h-6 flex items-center justify-center text-[14px] text-gray-500 px-2 hover:bg-gray-50 cursor-pointer transition-colors rounded"
          >
            2
          </Button>
          <span className="text-gray-500">...</span>
          <Button
            variant="ghost"
            className="min-w-6 h-6 flex items-center justify-center text-[14px] text-gray-500 px-2 hover:bg-gray-50 cursor-pointer transition-colors rounded"
          >
            58
          </Button>
          <Button
            variant="ghost"
            className="px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded h-auto"
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-500">Itens por página:</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px] border border-gray-200 rounded px-2 py-1 h-auto">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
