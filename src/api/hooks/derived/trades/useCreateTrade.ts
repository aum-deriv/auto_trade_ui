import { useMutation } from "../../base";
import { Trade, CreateTradeParams } from "../types";

/**
 * Hook for creating a new trade position
 *
 * @returns Object containing mutation function and state
 *
 * @example
 * ```typescript
 * function TradeForm() {
 *   const { mutate: createTrade, isLoading, error } = useCreateTrade();
 *
 *   const handleSubmit = async (data: CreateTradeParams) => {
 *     await createTrade(data);
 *   };
 *
 *   return (
 *     <form onSubmit={...}>
 *       {isLoading && <div>Creating trade...</div>}
 *       {error && <div>Error: {error.message}</div>}
 *     </form>
 *   );
 * }
 * ```
 */
export function useCreateTrade() {
    return useMutation<Trade, CreateTradeParams>("/api/trades/buy");
}
