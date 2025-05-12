import React, { useState, useRef } from "react";
import {
  Tag,
  User,
  Calendar,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Usuario } from "./user-list";

interface UserCardProps {
  usuario: Usuario;
  onEdit: () => void;
}

export function UserCard({ usuario, onEdit }: UserCardProps) {
  const [menuOpenDesktop, setMenuOpenDesktop] = useState(false);
  const [menuOpenMobile, setMenuOpenMobile] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRefDesktop = useRef<HTMLDivElement>(null);
  const menuRefMobile = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRefDesktop.current &&
        !menuRefDesktop.current.contains(event.target as Node)
      ) {
        setMenuOpenDesktop(false);
      }
      if (
        menuRefMobile.current &&
        !menuRefMobile.current.contains(event.target as Node)
      ) {
        setMenuOpenMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setMenuOpenDesktop(false);
    setMenuOpenMobile(false);
    onEdit();
  };

  const handleDelete = () => {
    setMenuOpenDesktop(false);
    setMenuOpenMobile(false);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center overflow-hidden">
      <div className="flex flex-1 items-center p-3 sm:p-4">
        <div className="h-[45px] w-[45px] sm:h-[56px] sm:w-[56px] bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium text-base mr-3">
          {usuario.id}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <h3 className="text-[14px] font-medium text-gray-900 truncate">
              {usuario.nome}
            </h3>
            <div className="flex items-center gap-1 mt-1 sm:mt-0">
              <User
                size={16}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[12px] text-gray-500 truncate">
                {usuario.idade} anos, {usuario.genero}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex gap-6 text-[12px] text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <Calendar
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{usuario.dataRegistro}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span>{usuario.tempoSessao}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{usuario.tipo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-[12px] ${
              usuario.status === "Ativo"
                ? "bg-[#f4f4f5] text-gray-800"
                : "border border-[#f4f4f5] text-gray-800 bg-transparent"
            }`}
          >
            {usuario.status}
          </span>

          <div className="sm:hidden relative" ref={menuRefMobile}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-50 p-0"
              onClick={() => setMenuOpenMobile(!menuOpenMobile)}
              title="Opções"
              aria-label="Opções do usuário"
            >
              <MoreHorizontal size={20} strokeWidth={1.5} />
            </Button>

            {menuOpenMobile && (
              <div
                className="fixed top-auto left-auto bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]"
                style={{
                  width: "192px",
                  transform: "translate(-70%, 10px)",
                }}
              >
                <div className="p-1">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleExpanded}
            className="sm:hidden text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Expandir detalhes"
          >
            <ChevronDown
              size={20}
              className={`transform transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>

          <div className="relative hidden sm:block" ref={menuRefDesktop}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-50 p-0"
              onClick={() => setMenuOpenDesktop(!menuOpenDesktop)}
              title="Opções"
              aria-label="Opções do usuário"
            >
              <MoreHorizontal size={20} strokeWidth={1.5} />
            </Button>

            {menuOpenDesktop && (
              <div
                className="fixed top-auto left-auto bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]"
                style={{
                  width: "192px",
                  transform: "translate(-70%, 10px)",
                }}
              >
                <div className="p-1">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="sm:hidden border-t border-gray-100 bg-gray-50 p-3">
          <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{usuario.dataRegistro}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span>{usuario.tempoSessao}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag
                size={14}
                className="text-gray-400 shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{usuario.tipo}</span>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <Pencil className="h-3.5 w-3.5 text-gray-500" />
              <span>Editar</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 text-sm text-red-600 bg-white border border-gray-200 rounded-md hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Excluir</span>
            </button>
          </div>
        </div>
      )}

      {confirmOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setConfirmOpen(false)}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">Confirmar exclusão</h3>
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500">
                  Tem certeza que deseja excluir o usuário{" "}
                  <strong className="text-gray-900">{usuario.nome}</strong>?
                  Esta ação não pode ser desfeita.
                </p>
              </div>

              <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                  className="bg-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white border-none"
                  onClick={confirmDelete}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {toastVisible && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 rounded-lg shadow-md p-4 flex items-center justify-between z-50 w-80 max-w-[90vw]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-sm">Usuário excluído com sucesso!</p>
          </div>
          <button
            onClick={() => setToastVisible(false)}
            className="text-gray-500 hover:text-gray-700 active:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
