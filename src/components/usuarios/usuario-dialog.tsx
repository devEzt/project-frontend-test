"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Usuario {
  id: string;
  nome: string;
  idade: number;
  genero: string;
  dataRegistro: string;
  tempoSessao: string;
  status: "Ativo" | "Inativo";
}

interface UsuarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario | null;
  onSave: (usuario: Usuario) => void;
}

const usuarioSchema = z.object({
  id: z.string().min(2, "ID deve ter pelo menos 2 caracteres"),
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  idade: z.coerce
    .number()
    .min(18, "Idade mínima é 18 anos")
    .max(100, "Idade máxima é 100 anos"),
  genero: z.string().min(1, "Selecione um gênero"),
  status: z.enum(["Ativo", "Inativo"]),
});

type UsuarioFormValues = z.infer<typeof usuarioSchema>;

export function UsuarioDialog({
  open,
  onOpenChange,
  usuario,
  onSave,
}: UsuarioDialogProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      id: "",
      nome: "",
      idade: 18,
      genero: "",
      status: "Ativo",
    },
  });

  useEffect(() => {
    if (usuario) {
      form.reset({
        id: usuario.id,
        nome: usuario.nome,
        idade: usuario.idade,
        genero: usuario.genero,
        status: usuario.status,
      });
    } else {
      form.reset({
        id: "",
        nome: "",
        idade: 18,
        genero: "",
        status: "Ativo",
      });
    }
  }, [usuario, form]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("orientationchange", checkScreenSize);

    const updateIOSHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateIOSHeight();
    window.addEventListener("resize", updateIOSHeight);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("orientationchange", checkScreenSize);
      window.removeEventListener("resize", updateIOSHeight);
    };
  }, []);

  const onSubmit = (data: UsuarioFormValues) => {
    const novoUsuario: Usuario = {
      ...data,
      dataRegistro: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      tempoSessao: "0m0s",
    };

    onSave(novoUsuario);
    onOpenChange(false);
  };

  if (isMobile) {
    return (
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
        side="bottom"
        className="w-full p-0"
      >
        <div className="flex flex-col h-full w-full">
          <div className="sticky top-0 bg-white p-3 border-b z-10 flex items-center justify-between">
            <h3 className="text-base font-medium truncate max-w-[80%]">
              {usuario ? "Editar usuário" : "Adicionar usuário"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-grow overflow-auto px-3 py-2 pb-20">
            <UserForm
              form={form}
              onSubmit={onSubmit}
              usuario={usuario}
              screenWidth={screenWidth}
              isMobile={true}
              onCancel={() => onOpenChange(false)}
            />
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-3 w-full shadow-md">
            <Button
              type="submit"
              form="user-form"
              className="w-full h-10 text-sm"
            >
              Salvar
            </Button>
          </div>
        </div>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[425px] p-4 sm:p-6 rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center sm:text-left">
            {usuario ? "Editar usuário" : "Adicionar usuário"}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          form={form}
          onSubmit={onSubmit}
          usuario={usuario}
          screenWidth={screenWidth}
          isMobile={false}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function UserForm({
  form,
  onSubmit,
  usuario,
  screenWidth,
  isMobile,
  onCancel,
}: {
  form: ReturnType<typeof useForm<UsuarioFormValues>>;
  onSubmit: (data: UsuarioFormValues) => void;
  usuario: Usuario | null;
  screenWidth: number;
  isMobile: boolean;
  onCancel: () => void;
}) {
  const getFieldSize = () => {
    if (screenWidth < 360) return "xs";
    if (screenWidth < 480) return "sm";
    return "md";
  };

  const fieldSize = getFieldSize();
  const isExtraSmall = fieldSize === "xs";

  return (
    <Form {...form}>
      <form
        id="user-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-4",
          isExtraSmall && "space-y-3",
          isMobile && "w-full max-w-full"
        )}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className={isExtraSmall ? "mb-2" : "mb-3"}>
              <FormLabel
                className={cn(
                  isMobile && "text-sm",
                  isExtraSmall && "text-xs mb-0.5"
                )}
              >
                ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={isExtraSmall ? "ID" : "ID (ex: JG)"}
                  {...field}
                  disabled={!!usuario}
                  className={cn(
                    "w-full",
                    isMobile && "h-10 text-sm",
                    isExtraSmall && "h-8 text-xs px-2 py-1"
                  )}
                />
              </FormControl>
              <FormMessage
                className={isExtraSmall ? "text-[10px]" : "text-xs"}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className={isExtraSmall ? "mb-2" : "mb-3"}>
              <FormLabel
                className={cn(
                  isMobile && "text-sm",
                  isExtraSmall && "text-xs mb-0.5"
                )}
              >
                {isExtraSmall ? "Nome" : "Nome completo"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={isExtraSmall ? "Nome" : "João da Silva"}
                  {...field}
                  className={cn(
                    "w-full",
                    isMobile && "h-10 text-sm",
                    isExtraSmall && "h-8 text-xs px-2 py-1"
                  )}
                />
              </FormControl>
              <FormMessage
                className={isExtraSmall ? "text-[10px]" : "text-xs"}
              />
            </FormItem>
          )}
        />

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-3",
            isExtraSmall && "gap-2"
          )}
        >
          <FormField
            control={form.control}
            name="idade"
            render={({ field }) => (
              <FormItem className={isExtraSmall ? "mb-2" : "mb-3"}>
                <FormLabel
                  className={cn(
                    isMobile && "text-sm",
                    isExtraSmall && "text-xs mb-0.5"
                  )}
                >
                  Idade
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className={cn(
                      "w-full",
                      isMobile && "h-10 text-sm",
                      isExtraSmall && "h-8 text-xs px-2 py-1"
                    )}
                  />
                </FormControl>
                <FormMessage
                  className={isExtraSmall ? "text-[10px]" : "text-xs"}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem className={isExtraSmall ? "mb-2" : "mb-3"}>
                <FormLabel
                  className={cn(
                    isMobile && "text-sm",
                    isExtraSmall && "text-xs mb-0.5"
                  )}
                >
                  Gênero
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        isMobile && "h-10 text-sm",
                        isExtraSmall && "h-8 text-xs px-2"
                      )}
                    >
                      <SelectValue
                        placeholder={
                          isExtraSmall ? "Selecione" : "Selecione..."
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Homem">Homem</SelectItem>
                    <SelectItem value="Mulher">Mulher</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage
                  className={isExtraSmall ? "text-[10px]" : "text-xs"}
                />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className={isExtraSmall ? "mb-2" : "mb-3"}>
              <FormLabel
                className={cn(
                  isMobile && "text-sm",
                  isExtraSmall && "text-xs mb-0.5"
                )}
              >
                Status
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      isMobile && "h-10 text-sm",
                      isExtraSmall && "h-8 text-xs px-2"
                    )}
                  >
                    <SelectValue
                      placeholder={isExtraSmall ? "Selecione" : "Selecione..."}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage
                className={isExtraSmall ? "text-[10px]" : "text-xs"}
              />
            </FormItem>
          )}
        />

        {!isMobile && (
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              Salvar
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
