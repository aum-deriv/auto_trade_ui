import { useOpenPositions } from "../../../../api/hooks/derived/trades";
import { TradeCard } from "../TradeCard";
import styles from "./ActiveTrades.module.scss";

export const ActiveTrades = () => {
    const { data: positions, isLoading, error } = useOpenPositions();

    if (isLoading) {
        return <div className={styles.message}>Loading active trades...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    if (!positions?.length) {
        return <div className={styles.message}>No active trades</div>;
    }

    return (
        <div className={styles.container}>
            {positions.map((trade) => (
                <TradeCard key={trade.trade_id} trade={trade} />
            ))}
        </div>
    );
};
