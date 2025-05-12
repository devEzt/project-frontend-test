"use client";

import { UserList } from "@/components/usuarios/user-list";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/drawer";

export default function UsuariosPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="space-y-5 py-6">
      <div className="flex justify-between items-center mb-5 px-10">
        <h1 className="text-2xl text-gray-800 font-medium font-serif">
          Usuários
        </h1>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="bg-[#102822] hover:bg-[#102822]/90 text-white h-[40px] w-[117px] rounded-full flex items-center justify-center gap-1 text-sm shadow-sm cursor-pointer transition-colors"
        >
          <span className="text-lg font-normal leading-none">+</span>
          <span>Adicionar</span>
        </button>
      </div>
      <UserList />

      <Sheet
        open={isAddUserOpen}
        onOpenChange={setIsAddUserOpen}
        side="right"
        className="w-[560px] h-screen p-6 overflow-y-auto"
      >
        <SheetClose onClick={() => setIsAddUserOpen(false)} />
        <SheetHeader>
          <SheetTitle>Adicionar usuário</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#102822] text-gray-500 text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="whatsapp"
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
                <div className="relative inline-block w-10 mr-2 align-middle">
                  <input
                    type="checkbox"
                    name="status"
                    id="status"
                    className="sr-only peer cursor-pointer"
                    defaultChecked
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#102822] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all cursor-pointer"></div>
                </div>
                <span className="text-[14px] text-gray-700">Ativo</span>
              </div>
            </div>
          </div>

          <div className="pt-5 flex justify-end space-x-3 mt-auto pb-6">
            <button
              type="button"
              onClick={() => setIsAddUserOpen(false)}
              className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#102822] text-white rounded-full text-sm font-medium hover:bg-[#102822]/90 cursor-pointer transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
