import React, { useContext, createContext } from "react";
//@ts-ignore
export const Context = createContext();

export const useLanguageContext = () => {
  return useContext(Context);
};

export default function Language({ children }: { children: any }) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}
