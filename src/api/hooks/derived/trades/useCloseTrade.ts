import { useMutation } from "../../base";
import { Trade, CloseTradeParams } from "../types";

/**
 * Hook for closing an existing trade position
 *
 * @returns Object containing mutation function and state
 *
 * @example
 * ```typescript
 * function TradeActions({ tradeId }: { tradeId: string }) {
 *   const { mutate: closeTrade, isLoading, error } = useCloseTrade();
 *
 *   const handleClose = async () => {
 *     await closeTrade({ trade_id: tradeId });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleClose} disabled={isLoading}>
 *         {isLoading ? "Closing..." : "Close Trade"}
 *       </button>
 *       {error && <div>Error: {error.message}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCloseTrade() {
    return useMutation<Trade, CloseTradeParams>("/api/trades/sell");
}
