"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
            <button className="text-black hover:text-gray-900 transition-colors cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200">
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className="relative text-black hover:text-gray-900 transition-colors cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-50 border border-gray-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
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
