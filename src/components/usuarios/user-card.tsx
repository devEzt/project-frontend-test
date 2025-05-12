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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Usuario } from "./user-list";

interface UserCardProps {
  usuario: Usuario;
  onEdit: () => void;
}

export function UserCard({ usuario, onEdit }: UserCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Função para fechar o menu quando clicar fora dele
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit();
  };

  const handleDelete = () => {
    setMenuOpen(false);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    // Lógica para excluir
    console.log("Usuário excluído:", usuario.id);
    // Mostrar o toast
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

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
        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-50 p-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreHorizontal size={20} strokeWidth={1.5} />
          </Button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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

      {/* Modal de confirmação de exclusão */}
      {confirmOpen && (
        <>
          {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setConfirmOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
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

      {/* Toast de confirmação */}
      {toastVisible && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 rounded-lg shadow-md p-4 flex items-center justify-between z-50 w-80">
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
