import { createContext, useContext, useEffect } from "react";
import { getWSClient, WSClient } from "./index";

/**
 * React Context for the WebSocket client
 */
const WSContext = createContext<WSClient | null>(null);

/**
 * Props for the WSProvider component
 */
interface WSProviderProps {
    /** WebSocket server URL */
    url: string;
    /** React children */
    children: React.ReactNode;
}

/**
 * Provider component that establishes and manages a WebSocket connection
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <WSProvider url="ws://localhost:8080/ws">
 *       <AppContent />
 *     </WSProvider>
 *   );
 * }
 * ```
 */
export function WSProvider({ url, children }: WSProviderProps) {
    useEffect(() => {
        const ws = getWSClient();
        ws.connect(url);

        return () => {
            ws.disconnect();
        };
    }, [url]);

    return (
        <WSContext.Provider value={getWSClient()}>
            {children}
        </WSContext.Provider>
    );
}

/**
 * Hook to access the WebSocket client instance
 * Must be used within a WSProvider component
 *
 * @example
 * ```tsx
 * function TradesList() {
 *   const ws = useWS();
 *
 *   useEffect(() => {
 *     const subId = ws.subscribe("trades", (data) => {
 *       // Handle trade updates
 *     });
 *
 *     return () => ws.unsubscribe(subId);
 *   }, []);
 *
 *   return <div>Trades List</div>;
 * }
 * ```
 */
export function useWS(): WSClient {
    const ws = useContext(WSContext);
    if (!ws) {
        throw new Error("useWS must be used within a WSProvider");
    }
    return ws;
}
