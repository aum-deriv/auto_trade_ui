import { useEffect } from "react";
import { useSubscription } from "../../base";
import { StrategyInstance } from "../types";

/**
 * Hook for subscribing to real-time strategy history updates
 *
 * @returns Object containing subscription data and state
 *
 * @example
 * ```typescript
 * function StrategiesHistoryList() {
 *   const { data: strategies, isLoading, error } = useStrategiesHistory();
 *
 *   if (isLoading) return <div>Loading strategies history...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!strategies?.length) return <div>No strategies history</div>;
 *
 *   return (
 *     <ul>
 *       {strategies.map((strategy) => (
 *         <li key={strategy.strategy_id}>
 *           {strategy.name} ({strategy.status})
 *           <p>Started: {new Date(strategy.start_time).toLocaleString()}</p>
 *           {strategy.stop_time && (
 *             <p>Stopped: {new Date(strategy.stop_time).toLocaleString()}</p>
 *           )}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useStrategiesHistory() {
    const subscription = useSubscription<StrategyInstance[]>();
    const { subscribe, unsubscribe } = subscription;

    useEffect(() => {
        subscribe("strategies_history");
        return () => unsubscribe();
    }, [subscribe, unsubscribe]);

    return subscription;
}
