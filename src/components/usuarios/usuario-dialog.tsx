"use client";

import { useEffect } from "react";
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

// Tipos para o componente
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

// Schema de validação
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
  // Definir form com validação
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

  // Atualizar valores do form quando o usuário mudar
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

  // Função de submissão
  const onSubmit = (data: UsuarioFormValues) => {
    // Criar um objeto usuário completo
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {usuario ? "Editar usuário" : "Adicionar usuário"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ID (ex: JG)"
                      {...field}
                      disabled={!!usuario}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Homem">Homem</SelectItem>
                      <SelectItem value="Mulher">Mulher</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
