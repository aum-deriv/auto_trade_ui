import { useEffect } from "react";
import { useSubscription } from "../../base";
import { StrategyInstance } from "../types";

/**
 * Hook for subscribing to real-time active strategies updates
 *
 * @returns Object containing subscription data and state
 *
 * @example
 * ```typescript
 * function ActiveStrategiesList() {
 *   const { data: strategies, isLoading, error } = useActiveStrategies();
 *
 *   if (isLoading) return <div>Loading strategies...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!strategies?.length) return <div>No active strategies</div>;
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
export function useActiveStrategies() {
    const subscription = useSubscription<StrategyInstance[]>();

    useEffect(() => {
        subscription.subscribe("active_strategies");
        return () => subscription.unsubscribe();
    }, [subscription]);

    return subscription;
}
