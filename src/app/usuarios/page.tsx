"use client";

import { UserList, Usuario } from "@/components/usuarios/user-list";
import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { filialsMockData } from "@/data/mocks";
import { FilialContext } from "@/lib/hooks/use-filial";

export default function UsuariosPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [statusAtivo, setStatusAtivo] = useState(true);
  const [filialAtual, setFilialAtual] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const storedFilial = localStorage.getItem("filialAtual");
    if (storedFilial) {
      setFilialAtual(Number(storedFilial));
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "filialAtual") {
        setFilialAtual(Number(e.newValue));
      }
    };

    const handleFilialChanged = (e: CustomEvent<{ filialId: number }>) => {
      console.log("Filial alterada via sidebar:", e.detail.filialId);
      setFilialAtual(e.detail.filialId);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "filialChanged",
      handleFilialChanged as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "filialChanged",
        handleFilialChanged as EventListener
      );
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("filialAtual", filialAtual.toString());
  }, [filialAtual]);

  const handleOpenDrawer = (usuario?: Usuario) => {
    if (usuario) {
      setUsuarioEmEdicao(usuario);
      setStatusAtivo(usuario.status === "Ativo");
    } else {
      setUsuarioEmEdicao(null);
      setStatusAtivo(true);
    }
    setIsAddUserOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsAddUserOpen(false);
    setUsuarioEmEdicao(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleCloseDrawer();

    if (usuarioEmEdicao) {
      setToastMessage("Usuário editado com sucesso!");
    } else {
      setToastMessage("Usuário adicionado com sucesso!");
    }

    setToastOpen(true);

    setTimeout(() => {
      setToastOpen(false);
    }, 5000);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoStatus = e.target.checked;
    console.log("Alterando status para:", novoStatus);
    setStatusAtivo(novoStatus);
  };

  const toggleStatus = () => {
    const novoStatus = !statusAtivo;
    console.log("Toggle status para:", novoStatus);
    setStatusAtivo(novoStatus);
  };

  const filialData = filialsMockData[filialAtual];

  return (
    <FilialContext.Provider value={{ filialAtual, setFilialAtual }}>
      <div className="space-y-5 py-6">
        <div className="flex justify-between items-center mb-5 px-10">
          <h1 className="text-2xl text-gray-800 font-medium font-serif">
            Usuários
          </h1>
          <button
            onClick={() => handleOpenDrawer()}
            className="bg-[#102822] hover:bg-[#102822]/90 text-white h-[40px] w-[117px] rounded-full flex items-center justify-center gap-1 text-sm shadow-sm cursor-pointer transition-colors"
          >
            <span className="text-lg font-normal leading-none">+</span>
            <span>Adicionar</span>
          </button>
        </div>
        <UserList
          onEditUsuario={(usuario) => handleOpenDrawer(usuario)}
          totalUsuarios={filialData.usuarios}
          usuariosAtivos={filialData.usuariosAtivos}
          usuariosInativos={filialData.usuariosInativos}
          tempoMedioSessao={filialData.tempoMedioSessao}
          usuariosFilial={filialData.mockUsuarios as Usuario[]}
          filialId={filialData.id}
        />

        <Sheet
          open={isAddUserOpen}
          onOpenChange={handleCloseDrawer}
          side="right"
          className="w-[560px] h-full p-6 overflow-y-auto"
        >
          <SheetClose onClick={handleCloseDrawer} />
          <SheetHeader>
            <SheetTitle>
              {usuarioEmEdicao ? "Editar usuário" : "Adicionar usuário"}
            </SheetTitle>
          </SheetHeader>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="block text-[14px] font-medium text-gray-700"
              >
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Digite o nome"
                defaultValue={usuarioEmEdicao?.nome || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[14px] font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite o e-mail"
                defaultValue={usuarioEmEdicao?.email || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="telefone"
                className="block text-[14px] font-medium text-gray-700"
              >
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                placeholder="Informe o telefone"
                defaultValue={usuarioEmEdicao?.telefone || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="whatsapp"
                defaultChecked={usuarioEmEdicao?.whatsapp || false}
                className="h-5 w-5 text-[#102822] focus:ring-[#102822] border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="whatsapp"
                className="ml-2 block text-[14px] text-gray-700"
              >
                WhatsApp
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="cpf"
                  className="block text-[14px] font-medium text-gray-700"
                >
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="Informe o CPF"
                  defaultValue={usuarioEmEdicao?.cpf || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="rg"
                  className="block text-[14px] font-medium text-gray-700"
                >
                  RG
                </label>
                <input
                  type="text"
                  id="rg"
                  placeholder="Informe o RG"
                  defaultValue={usuarioEmEdicao?.rg || ""}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email2"
                className="block text-[14px] font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email2"
                placeholder="Digite o e-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700">
                    Status
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Definia se o usuário estará ativo ao ser adicionado.
                  </p>
                </div>
                <div className="flex items-center">
                  <div
                    className="relative inline-block w-10 mr-2 align-middle"
                    onClick={toggleStatus}
                  >
                    <input
                      type="checkbox"
                      name="status"
                      id="status"
                      className="sr-only peer cursor-pointer"
                      checked={statusAtivo}
                      onChange={handleStatusChange}
                    />
                    <div
                      className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#102822] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all cursor-pointer"
                      onClick={toggleStatus}
                    ></div>
                  </div>
                  <span
                    className="text-[14px] text-gray-700 cursor-pointer"
                    onClick={toggleStatus}
                  >
                    {statusAtivo ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 flex justify-end space-x-3 mt-auto pb-6">
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#102822] text-white rounded-full text-sm font-medium hover:bg-[#102822]/90 cursor-pointer transition-colors"
              >
                {usuarioEmEdicao ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </form>
        </Sheet>

        <Toast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          message={toastMessage}
        />
      </div>
    </FilialContext.Provider>
  );
}
