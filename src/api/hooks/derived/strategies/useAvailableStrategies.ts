import { useQuery } from "../../base";
import { Strategy } from "../types";

/**
 * Hook for fetching available trading strategies
 *
 * @returns Object containing query data and state
 *
 * @example
 * ```typescript
 * function StrategyList() {
 *   const { data: strategies, isLoading, error } = useAvailableStrategies();
 *
 *   if (isLoading) return <div>Loading strategies...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!strategies?.length) return <div>No strategies available</div>;
 *
 *   return (
 *     <ul>
 *       {strategies.map((strategy) => (
 *         <li key={strategy.name}>
 *           <h3>{strategy.name}</h3>
 *           <p>Parameters:</p>
 *           <ul>
 *             {strategy.parameters.map((param) => (
 *               <li key={param.name}>
 *                 {param.name} ({param.type})
 *                 {param.required && " *"}
 *               </li>
 *             ))}
 *           </ul>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useAvailableStrategies() {
    return useQuery<Strategy[]>("/api/strategies/default");
}
