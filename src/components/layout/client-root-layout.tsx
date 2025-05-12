"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Headphones,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const filiaisData = [
  {
    id: "FA",
    nome: "Filial A",
    usuarios: "294",
    usuariosAtivos: "203",
    usuariosInativos: "127",
    tempoMedioSessao: "31m 20s",
  },
  {
    id: "FB",
    nome: "Filial B",
    usuarios: "156",
    usuariosAtivos: "98",
    usuariosInativos: "58",
    tempoMedioSessao: "27m 45s",
  },
  {
    id: "FC",
    nome: "Filial C",
    usuarios: "312",
    usuariosAtivos: "245",
    usuariosInativos: "67",
    tempoMedioSessao: "42m 12s",
  },
];

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [filialAtual, setFilialAtual] = useState(0);

  const helpRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);

  useEffect(() => {
    const storedFilial = localStorage.getItem("filialAtual");
    if (storedFilial) {
      setFilialAtual(Number(storedFilial));
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "filialAtual") {
        setFilialAtual(Number(e.newValue || "0"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
    if (notificationsOpen) setNotificationsOpen(false);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (helpOpen) setHelpOpen(false);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (helpOpen) setHelpOpen(false);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const proximaFilial = () => {
    const novaFilial =
      filialAtual < filiaisData.length - 1 ? filialAtual + 1 : filialAtual;
    setFilialAtual(novaFilial);
    localStorage.setItem("filialAtual", novaFilial.toString());

    const event = new CustomEvent("filialChanged", {
      detail: { filialId: novaFilial },
    });
    window.dispatchEvent(event);
  };

  const filialAnterior = () => {
    const novaFilial = filialAtual > 0 ? filialAtual - 1 : filialAtual;
    setFilialAtual(novaFilial);
    localStorage.setItem("filialAtual", novaFilial.toString());

    const event = new CustomEvent("filialChanged", {
      detail: { filialId: novaFilial },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <aside
        className={cn(
          "border-r border-[#e4e4e7] flex flex-col bg-[#fbfbfb] transition-all duration-300 ease-in-out fixed md:relative z-20 h-full",
          sidebarOpen ? "w-[280px] max-w-full" : "w-0 overflow-hidden"
        )}
        style={{
          boxShadow:
            sidebarOpen && isMobile ? "0 0 15px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="pl-6 pr-4 h-16 border-b border-[#e4e4e7] flex items-center justify-between">
          <div className="w-[96px] h-[32px] bg-black text-white rounded-md flex items-center justify-center font-medium">
            Logo
          </div>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
              aria-label="Fechar menu lateral"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div className="p-6 border-b border-[#e4e4e7]">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center gap-3 bg-gray-50 rounded-lg p-4 transition-colors">
              <div className="h-14 w-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-800 font-bold text-xl">
                {filiaisData[filialAtual].id}
              </div>
              <div className="flex-1">
                <span className="text-gray-800 text-lg font-medium">
                  {filiaisData[filialAtual].nome}
                </span>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={filialAnterior}
                  disabled={filialAtual === 0}
                  className={`flex items-center justify-center p-1 ${
                    filialAtual === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-200"
                  } rounded-md transition-colors`}
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <button
                  onClick={proximaFilial}
                  disabled={filialAtual === filiaisData.length - 1}
                  className={`flex items-center justify-center p-1 ${
                    filialAtual === filiaisData.length - 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-200"
                  } rounded-md transition-colors`}
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-6 pb-3">
          <div className="text-sm text-gray-500 font-normal">Menu</div>
        </div>
        <nav className="space-y-1.5 px-4">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              pathname === "/dashboard"
                ? "text-white bg-[#102822]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" strokeWidth={1.5} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/usuarios"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              pathname === "/usuarios"
                ? "text-white bg-[#102822]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="h-5 w-5" strokeWidth={1.5} />
            <span>Usuários</span>
          </Link>
          <Link
            href="/documentos"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              pathname === "/documentos"
                ? "text-white bg-[#102822]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="h-5 w-5" strokeWidth={1.5} />
            <span>Documentos</span>
          </Link>
        </nav>

        <div className="px-6 pt-8 pb-3">
          <div className="text-sm text-gray-500 font-normal">Configurações</div>
        </div>
        <nav className="space-y-1.5 px-4">
          <Link
            href="/geral"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              pathname === "/geral"
                ? "text-white bg-[#102822]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="h-5 w-5" strokeWidth={1.5} />
            <span>Geral</span>
          </Link>
        </nav>

        <div className="mt-auto p-6 border-t border-[#e4e4e7]">
          <div className="flex items-center justify-between text-gray-600 hover:text-gray-700 cursor-pointer rounded-lg p-2 hover:bg-gray-50 transition-colors">
            <span>Precisa de ajuda?</span>
            <Headphones className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </aside>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden cursor-pointer"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col w-full">
        <header className="h-16 border-b border-[#e4e4e7] flex items-center justify-between bg-white px-6 z-10">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            aria-label={
              sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"
            }
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <PanelLeftOpen className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <div className="flex items-center gap-4">
            <div className="relative" ref={helpRef}>
              <button
                className="text-black hover:text-gray-900 transition-colors cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                onClick={toggleHelp}
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              {helpOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Central de Ajuda
                      </h3>
                      <button
                        onClick={() => setHelpOpen(false)}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <ul className="space-y-2">
                      <li className="hover:bg-gray-50 p-2 rounded-md">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Como usar o sistema</span>
                        </a>
                      </li>
                      <li className="hover:bg-gray-50 p-2 rounded-md">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Documentação</span>
                        </a>
                      </li>
                      <li className="hover:bg-gray-50 p-2 rounded-md">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Headphones className="h-4 w-4" />
                          <span>Contatar suporte</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={notificationsRef}>
              <button
                className="relative text-black hover:text-gray-900 transition-colors cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Notificações
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#102822] hover:underline cursor-pointer">
                          Marcar todas como lidas
                        </span>
                        <button
                          onClick={() => setNotificationsOpen(false)}
                          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 p-2 bg-[#e9f0ee] rounded-md">
                        <div className="h-8 w-8 bg-[#d1e0dd] rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-[#102822]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            Novo usuário foi adicionado ao sistema
                          </p>
                          <span className="text-xs text-gray-500">
                            Há 5 minutos
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            Relatório mensal disponível para download
                          </p>
                          <span className="text-xs text-gray-500">
                            Há 3 horas
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Settings className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            Atualizações do sistema serão instaladas amanhã
                          </p>
                          <span className="text-xs text-gray-500">
                            Há 1 dia
                          </span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-gray-100 text-center">
                      <a
                        href="#"
                        className="text-sm text-[#102822] hover:underline"
                      >
                        Ver todas
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="h-10 w-10 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-colors border-2 border-transparent hover:border-gray-200"
                aria-label="Menu do usuário"
              >
                <Image
                  src="/avatars/user-avatar1.jpg"
                  alt="Perfil do usuário"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src="/avatars/user-avatar1.jpg"
                          alt="Perfil do usuário"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          João Silva
                        </p>
                        <p className="text-xs text-gray-500">
                          joao.silva@exemplo.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <ul className="space-y-1">
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                        >
                          <User className="h-4 w-4" />
                          <span>Meu Perfil</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Configurações</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Privacidade</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="p-2 border-t border-gray-100">
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-0">{children}</main>
      </div>
    </div>
  );
}
