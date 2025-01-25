import { useState, useCallback, useEffect, useRef } from "react";
import { useWS } from "../../../api/ws";

/**
 * Result type for the useSubscription hook
 * @template T The expected type of the subscription data
 */
interface SubscriptionResult<T> {
    /** The latest data received from the subscription */
    data: T | null;
    /** Whether the subscription is currently loading */
    isLoading: boolean;
    /** Any error that occurred during subscription */
    error: Error | null;
    /** Function to subscribe to a specific message type */
    subscribe: (type: string) => void;
    /** Function to unsubscribe from the current subscription */
    unsubscribe: () => void;
}

/**
 * Hook for managing WebSocket subscriptions with state management
 *
 * @template T The expected type of the subscription data
 * @returns Object containing subscription state and control functions
 *
 * @example
 * ```typescript
 * interface TradeUpdate {
 *   trade_id: string;
 *   symbol: string;
 *   price: number;
 * }
 *
 * function TradesList() {
 *   const { data, isLoading, error, subscribe, unsubscribe } =
 *     useSubscription<TradeUpdate>();
 *
 *   useEffect(() => {
 *     subscribe("trade_updates");
 *     return () => unsubscribe();
 *   }, [subscribe, unsubscribe]);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!data) return <div>No trades</div>;
 *
 *   return (
 *     <div>
 *       Trade: {data.symbol} @ {data.price}
 *     </div>
 *   );
 * }
 * ```
 */
export function useSubscription<T>(): SubscriptionResult<T> {
    const ws = useWS();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const subscriptionId = useRef<string | null>(null);

    const subscribe = useCallback(
        (type: string) => {
            try {
                setIsLoading(true);
                setError(null);

                // Cleanup any existing subscription
                if (subscriptionId.current) {
                    ws.unsubscribe(subscriptionId.current);
                }

                subscriptionId.current = ws.subscribe<T>(type, (newData) => {
                    setData(newData);
                    setIsLoading(false);
                    setError(null);
                });
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Subscription failed")
                );
                setIsLoading(false);
            }
        },
        [ws]
    );

    const unsubscribe = useCallback(() => {
        if (subscriptionId.current) {
            try {
                ws.unsubscribe(subscriptionId.current);
                subscriptionId.current = null;
                setData(null);
            } catch (err) {
                setError(
                    err instanceof Error ? err : new Error("Unsubscribe failed")
                );
            }
        }
    }, [ws]);

    // Cleanup subscription on unmount
    useEffect(() => {
        return () => {
            if (subscriptionId.current) {
                ws.unsubscribe(subscriptionId.current);
            }
        };
    }, [ws]);

    return {
        data,
        isLoading,
        error,
        subscribe,
        unsubscribe,
    };
}
