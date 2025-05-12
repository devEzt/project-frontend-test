import { useContext, createContext } from "react";

export const FilialContext = createContext<{
  filialAtual: number;
  setFilialAtual: React.Dispatch<React.SetStateAction<number>>;
}>({
  filialAtual: 0,
  setFilialAtual: () => {},
});

export const useFilial = () => useContext(FilialContext); 