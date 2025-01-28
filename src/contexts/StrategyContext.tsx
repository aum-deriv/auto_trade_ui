import { createContext, useContext, useState, ReactNode } from "react";
import { Strategy } from "../api/hooks/derived/types";

interface StrategyContextType {
    selectedStrategy: Strategy | null;
    setSelectedStrategy: (strategy: Strategy | null) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(
    undefined
);

export function StrategyProvider({ children }: { children: ReactNode }) {
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
        null
    );

    return (
        <StrategyContext.Provider
            value={{ selectedStrategy, setSelectedStrategy }}
        >
            {children}
        </StrategyContext.Provider>
    );
}

export function useStrategy() {
    const context = useContext(StrategyContext);
    if (context === undefined) {
        throw new Error("useStrategy must be used within a StrategyProvider");
    }
    return context;
}
