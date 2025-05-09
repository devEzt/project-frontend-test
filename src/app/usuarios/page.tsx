import { UserList } from "@/components/usuarios/user-list";

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-800 font-medium">Usuários</h1>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full flex items-center gap-1 text-sm">
          <span className="text-lg font-normal leading-none">+</span>
          <span>Adicionar</span>
        </button>
      </div>
      <UserList />
    </div>
  );
}
