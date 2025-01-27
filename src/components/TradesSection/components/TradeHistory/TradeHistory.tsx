import { useTradeHistory } from "../../../../api/hooks/derived/trades";
import { TradeCard } from "../TradeCard";
import styles from "./TradeHistory.module.scss";

export const TradeHistory = () => {
    const { data: trades, isLoading, error } = useTradeHistory();

    if (isLoading) {
        return <div className={styles.message}>Loading trade history...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    if (!trades?.length) {
        return <div className={styles.message}>No trade history</div>;
    }

    return (
        <div className={styles.container}>
            {trades.map((trade) => (
                <TradeCard key={trade.trade_id} trade={trade} />
            ))}
        </div>
    );
};
