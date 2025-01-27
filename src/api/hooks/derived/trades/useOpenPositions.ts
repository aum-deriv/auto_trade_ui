import { useEffect } from "react";
import { useSubscription } from "../../base";
import { Trade } from "../types";

/**
 * Hook for subscribing to real-time open positions updates
 *
 * @returns Object containing subscription data and state
 *
 * @example
 * ```typescript
 * function OpenPositionsList() {
 *   const { data: positions, isLoading, error } = useOpenPositions();
 *
 *   if (isLoading) return <div>Loading positions...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!positions?.length) return <div>No open positions</div>;
 *
 *   return (
 *     <ul>
 *       {positions.map((position) => (
 *         <li key={position.trade_id}>
 *           {position.symbol} @ {position.entry_price}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useOpenPositions() {
    const subscription = useSubscription<Trade[]>();
    const { subscribe, unsubscribe } = subscription;

    useEffect(() => {
        subscribe("open_positions");
        return () => unsubscribe();
    }, [subscribe, unsubscribe]);

    return subscription;
}
