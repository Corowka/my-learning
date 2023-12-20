"use client"

import { createContext, useContext, useState, Dispatch, SetStateAction } from "react"
import {Company, Person, Data} from "../config"

interface AppContextProps {
    menuState: string,
    setMenuState: Dispatch<SetStateAction<string>>,
    data: Data,
    setData: Dispatch<SetStateAction<Data>>,
}

const AppContext = createContext<AppContextProps>({
    menuState: "companies",
    setMenuState: () => {}, 
    data: { companies: [], clients: [], directors: [], planners: [], designers: [], },
    setData: () => [],
})

interface AppContextProviderProps {
    children: React.ReactNode
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [menuState, setMenuState] = useState('companies');
    // const [sortState, setSortState] = useState();
    const [data, setData] = useState<Data>({ companies: [], clients: [], directors: [], planners: [], designers: [], });

    return (
        <AppContext.Provider value={{
            menuState, setMenuState,
            // sortState, setSortState,
            data, setData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext)

