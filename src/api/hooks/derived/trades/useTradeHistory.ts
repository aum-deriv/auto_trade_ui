import { useEffect } from "react";
import { useSubscription } from "../../base";
import { Trade } from "../types";

/**
 * Hook for subscribing to real-time trade history updates
 *
 * @returns Object containing subscription data and state
 *
 * @example
 * ```typescript
 * function TradeHistoryList() {
 *   const { data: trades, isLoading, error } = useTradeHistory();
 *
 *   if (isLoading) return <div>Loading trade history...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!trades?.length) return <div>No trade history</div>;
 *
 *   return (
 *     <ul>
 *       {trades.map((trade) => (
 *         <li key={trade.trade_id}>
 *           {trade.symbol}: {trade.entry_price} → {trade.exit_price}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useTradeHistory() {
    const subscription = useSubscription<Trade[]>();

    useEffect(() => {
        subscription.subscribe("trade_history");
        return () => subscription.unsubscribe();
    }, [subscription]);

    return subscription;
}
