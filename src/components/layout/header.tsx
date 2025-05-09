"use client";

import { Bell, HelpCircle, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b px-4 flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" className="rounded-full">
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Avatar className="h-10 w-10">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
