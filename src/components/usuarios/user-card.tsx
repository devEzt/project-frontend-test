import React from "react";

interface Usuario {
  id: string;
  nome: string;
  idade: number;
  genero: string;
  dataRegistro: string;
  tempoSessao: string;
  status: "Ativo" | "Inativo";
  tipo?: string;
}

export function UserCard({ usuario }: { usuario: Usuario }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 flex items-center h-[80px] p-0">
      <div className="flex flex-1 items-center">
        <div className="h-[56px] w-[56px] bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-medium text-base mx-[12px]">
          {usuario.id}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-medium text-gray-900">
              {usuario.nome}
            </h3>
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 20C18 17.7909 15.3137 16 12 16C8.68629 16 6 17.7909 6 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[12px] text-gray-500">
                {usuario.idade} anos, {usuario.genero}
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-[12px] text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 2V6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {usuario.dataRegistro}
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {usuario.tempoSessao}
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M10.9042 3H18.1042C18.6565 3 19.1042 3.44772 19.1042 4V11.2C19.1042 11.4652 19 11.7196 18.8142 11.9054L11.0096 19.71C10.6191 20.1005 9.98229 20.1005 9.59177 19.71L4.39177 14.51C4.00124 14.1195 4.00124 13.4827 4.39177 13.0921L12.1963 5.28761C12.3821 5.10178 12.6365 4.99761 12.9017 4.99761L13.0042 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="7" r="1" fill="currentColor" />
              </svg>
              {usuario.tipo}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mr-[12px]">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-[12px] ${
            usuario.status === "Ativo"
              ? "bg-[#f4f4f5] text-gray-800"
              : "border border-[#f4f4f5] text-gray-800 bg-transparent"
          }`}
        >
          {usuario.status}
        </span>
        <button className="text-gray-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99998C10.8334 9.53974 10.4603 9.16665 10 9.16665C9.53978 9.16665 9.16669 9.53974 9.16669 9.99998C9.16669 10.4602 9.53978 10.8333 10 10.8333Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.8334 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 9.99998C16.6667 9.53974 16.2936 9.16665 15.8334 9.16665C15.3731 9.16665 15 9.53974 15 9.99998C15 10.4602 15.3731 10.8333 15.8334 10.8333Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16669 10.8333C4.62693 10.8333 5.00002 10.4602 5.00002 9.99998C5.00002 9.53974 4.62693 9.16665 4.16669 9.16665C3.70645 9.16665 3.33336 9.53974 3.33336 9.99998C3.33336 10.4602 3.70645 10.8333 4.16669 10.8333Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
