"use client";

import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Clock,
  FileText,
  Headphones,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 border-r flex flex-col bg-white">
        {/* Logo */}
        <div className="pl-6 pr-0 h-16 border-b flex items-center">
          <div className="w-[96px] h-[32px] bg-black text-white rounded-md flex items-center justify-center font-medium">
            Logo
          </div>
        </div>

        {/* Filial selector */}
        <div className="p-6 border-b">
          <button className="w-full flex items-center justify-between">
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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
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
        <div className="mt-auto p-6 border-t">
          <div className="flex items-center justify-between text-gray-600">
            <span>Precisa de ajuda?</span>
            <Headphones className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-end bg-white px-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-400">
              <Clock className="h-5 w-5" />
            </button>
            <button className="relative text-gray-400">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <div className="h-8 w-8 ml-1 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">
              US
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
