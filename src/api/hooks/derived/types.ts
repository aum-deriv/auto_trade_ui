/**
 * Trade related types
 */
export interface Trade {
    trade_id: string;
    symbol: string;
    entry_price: number;
    exit_price?: number;
    entry_time: string;
    exit_time?: string;
}

export interface CreateTradeParams {
    symbol: string;
    entry_price: number;
}

export interface CloseTradeParams {
    trade_id: string;
}

/**
 * Strategy related types
 */
export interface Strategy {
    name: string;
    parameters: StrategyParameter[];
    strategy_flow: string[];
}

export interface StrategyParameter {
    name: string;
    type: "string" | "number" | "boolean";
    required: boolean;
    description: string;
}

export interface StrategyInstance {
    id: string;
    name: string;
    status: "active" | "stopped";
    parameters: Record<string, unknown>;
    start_time: string;
    stop_time?: string;
}

export interface StartStrategyParams {
    name: string;
    parameters: Record<string, unknown>;
}

export interface StopStrategyParams {
    id: string;
}
