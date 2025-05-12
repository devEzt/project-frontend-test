"use client";

import { useState, useEffect } from "react";
import { UserCard } from "./user-card";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Loader2,
} from "lucide-react";
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

interface UserListProps {
  onEditUsuario: (usuario: Usuario) => void;
  totalUsuarios?: string;
  usuariosAtivos?: string;
  usuariosInativos?: string;
  tempoMedioSessao?: string;
  usuariosFilial?: Usuario[];
  filialId?: string;
}

export function UserList({
  onEditUsuario,
  totalUsuarios = "294",
  usuariosAtivos = "203",
  usuariosInativos = "127",
  tempoMedioSessao = "31m 20s",
  usuariosFilial = [],
  filialId = "FA",
}: UserListProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [usuariosPaginados, setUsuariosPaginados] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      if (usuariosFilial && usuariosFilial.length > 0) {
        setUsuarios(usuariosFilial);
      }
      setCurrentPage(1);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [usuariosFilial, filialId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setUsuariosPaginados(usuarios.slice(startIndex, endIndex));
  }, [usuarios, currentPage, itemsPerPage]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const totalPagesCalculated = Math.ceil(usuarios.length / itemsPerPage);
  const totalPages =
    usuarios.length > 0
      ? totalPagesCalculated
      : Math.ceil(parseInt(totalUsuarios) / itemsPerPage);

  const paginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        items.push("ellipsis");
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (endPage < totalPages - 1) {
        items.push("ellipsis");
      }

      items.push(totalPages);
    }

    return items;
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const changeItemsPerPage = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 px-4 sm:px-10">
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-3 sm:p-4 flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Usuários</p>
          <p className="text-[22px] sm:text-[30px] font-normal font-serif">
            {totalUsuarios}
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-3 sm:p-4 flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Tempo</p>
          <p className="text-[22px] sm:text-[30px] font-normal font-serif">
            {tempoMedioSessao}
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-3 sm:p-4 flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Ativos</p>
          <p className="text-[22px] sm:text-[30px] font-normal font-serif">
            {usuariosAtivos}
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm p-3 sm:p-4 flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1 font-sans">Inativos</p>
          <p className="text-[22px] sm:text-[30px] font-normal font-serif">
            {usuariosInativos}
          </p>
        </div>
      </div>

      <div className="relative mb-5 px-4 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
              <Search size={17} />
            </div>
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none text-sm font-sans"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFilters}
            className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-gray-50"
          >
            <ListFilter className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
          </Button>
        </div>

        {filtersVisible && (
          <div className="mt-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Status
                </label>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-full border border-gray-200 rounded">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Gênero
                </label>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-full border border-gray-200 rounded">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="homem">Homem</SelectItem>
                    <SelectItem value="mulher">Mulher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-full border border-gray-200 rounded">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="padrao">Usuário padrão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-3 gap-2">
              <Button variant="outline" size="sm" className="h-8 bg-white">
                Limpar
              </Button>
              <Button size="sm" className="h-8">
                Aplicar
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 px-4 sm:px-10 font-sans min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">Carregando usuários...</p>
          </div>
        ) : usuariosPaginados.length > 0 ? (
          usuariosPaginados.map((usuario) => (
            <UserCard
              key={usuario.id}
              usuario={usuario}
              onEdit={() => onEditUsuario(usuario)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5 px-4 sm:px-10 font-sans gap-4">
        <span className="text-[14px] text-gray-500 order-3 sm:order-1 text-center sm:text-left">
          {isLoading ? "0" : Math.min(itemsPerPage, usuarios.length)} de{" "}
          {isLoading ? "0" : usuarios.length} itens
        </span>

        <div className="flex items-center justify-center gap-1 order-1 sm:order-2">
          <Button
            variant="ghost"
            className="px-2 sm:px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded h-auto"
            onClick={() => currentPage > 1 && changePage(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {paginationItems().map((item, index) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={`page-${item}`}
                variant={currentPage === item ? "default" : "ghost"}
                className={`min-w-6 h-6 flex items-center justify-center text-[14px] ${
                  currentPage === item
                    ? "bg-white text-gray-700 border border-gray-200 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                } rounded-md px-2 cursor-pointer transition-colors`}
                onClick={() => changePage(Number(item))}
                disabled={isLoading}
              >
                {item}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            className="px-2 sm:px-3 py-1 text-[14px] text-gray-500 flex items-center hover:bg-gray-50 cursor-pointer transition-colors rounded h-auto"
            onClick={() =>
              currentPage < totalPages && changePage(currentPage + 1)
            }
            disabled={currentPage === totalPages || isLoading}
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 order-2 sm:order-3">
          <span className="text-[14px] text-gray-500">Itens por página:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={changeItemsPerPage}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[70px] border border-gray-200 rounded px-2 py-1 h-auto">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
