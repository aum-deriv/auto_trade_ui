import { useMutation } from "../../base";
import { StrategyInstance, StopStrategyParams } from "../types";

/**
 * Hook for stopping a running strategy instance
 *
 * @returns Object containing mutation function and state
 *
 * @example
 * ```typescript
 * function StrategyControls({ strategyId }: { strategyId: string }) {
 *   const { mutate: stopStrategy, isLoading, error } = useStopStrategy();
 *
 *   const handleStop = async () => {
 *     try {
 *       await stopStrategy({ strategy_id: strategyId });
 *       // Handle success
 *     } catch (err) {
 *       // Handle error
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleStop} disabled={isLoading}>
 *         {isLoading ? "Stopping..." : "Stop Strategy"}
 *       </button>
 *       {error && <div>Error: {error.message}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useStopStrategy() {
    return useMutation<StrategyInstance, StopStrategyParams>(
        "/api/strategies/stop"
    );
}
