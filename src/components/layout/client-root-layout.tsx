"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  FileText,
  Headphones,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const helpRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Detectar tamanho de tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar ao inicializar
    checkScreenSize();

    // Fechar sidebar automaticamente em telas pequenas
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    // Adicionar event listener para redimensionamento
    window.addEventListener("resize", checkScreenSize);

    // Limpar event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);

  // Fechar dropdowns ao clicar fora deles
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
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (helpOpen) setHelpOpen(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
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
        {/* Logo */}
        <div className="pl-6 pr-0 h-16 border-b border-[#e4e4e7] flex items-center">
          <div className="w-[96px] h-[32px] bg-black text-white rounded-md flex items-center justify-center font-medium">
            Logo
          </div>
        </div>

        {/* Filial selector */}
        <div className="p-6 border-b border-[#e4e4e7]">
          <button className="w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium">
                FA
              </div>
              <span className="text-gray-700">Filial A</span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Menu */}
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

        {/* Help */}
        <div className="mt-auto p-6 border-t border-[#e4e4e7]">
          <div className="flex items-center justify-between text-gray-600 hover:text-gray-700 cursor-pointer rounded-lg p-2 hover:bg-gray-50 transition-colors">
            <span>Precisa de ajuda?</span>
            <Headphones className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </aside>

      {/* Overlay para fechar sidebar em telas menores */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden cursor-pointer"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="h-16 border-b border-[#e4e4e7] flex items-center justify-between bg-white px-6 z-10">
          {/* Toggle Sidebar Button */}
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

            <div className="h-10 w-10 ml-2 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-colors">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Perfil do usuário"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-0">{children}</main>
      </div>
    </div>
  );
}
