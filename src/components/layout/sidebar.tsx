"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function Sidebar() {
  const pathname = usePathname();

  const NavItem = ({ href, icon, label }: NavItemProps) => {
    const isActive = pathname === href;

    return (
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 font-normal",
            isActive && "bg-accent text-accent-foreground font-medium"
          )}
        >
          {icon}
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <div className="min-w-64 h-screen border-r border-[#e4e4e7] bg-[#fbfbfb] flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-[#e4e4e7]">
        <Button variant="ghost" className="font-bold text-xl p-2 text-black">
          Logo
        </Button>
      </div>

      {/* Usuário logado */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="font-medium">FA</div>
          <div>Filial A</div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-2 py-2">
        <div className="text-xs text-muted-foreground px-4 py-2">Menu</div>
        <div className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
          />
          <NavItem
            href="/usuarios"
            icon={<Users className="h-4 w-4" />}
            label="Usuários"
          />
          <NavItem
            href="/documentos"
            icon={<FileText className="h-4 w-4" />}
            label="Documentos"
          />
        </div>
      </div>

      <Separator className="my-2" />

      {/* Configurações */}
      <div className="px-2 py-2">
        <div className="text-xs text-muted-foreground px-4 py-2">
          Configurações
        </div>
        <div className="space-y-1">
          <NavItem
            href="/configuracoes"
            icon={<Settings className="h-4 w-4" />}
            label="Geral"
          />
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-[#e4e4e7] flex items-center gap-2">
        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Precisa de ajuda?</span>
      </div>
    </div>
  );
}
