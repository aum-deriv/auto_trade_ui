import { useMutation } from "../../base";
import { StrategyInstance, StartStrategyParams } from "../types";

/**
 * Hook for starting a new trading strategy instance
 *
 * @returns Object containing mutation function and state
 *
 * @example
 * ```typescript
 * function StartStrategyForm() {
 *   const { mutate: startStrategy, isLoading, error } = useStartStrategy();
 *
 *   const handleSubmit = async (data: StartStrategyParams) => {
 *     try {
 *       await startStrategy(data);
 *       // Handle success
 *     } catch (err) {
 *       // Handle error
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={...}>
 *       {isLoading && <div>Starting strategy...</div>}
 *       {error && <div>Error: {error.message}</div>}
 *       <button type="submit" disabled={isLoading}>
 *         Start Strategy
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useStartStrategy() {
    return useMutation<StrategyInstance, StartStrategyParams>(
        "/api/strategies/start"
    );
}
