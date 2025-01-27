import { Text } from "@deriv-com/quill-ui";
import { useOpenPositions } from "../../../../api/hooks/derived/trades";
import { TradeCard } from "../TradeCard";
import styles from "./ActiveTrades.module.scss";

export const ActiveTrades = () => {
    const { data: positions, isLoading, error } = useOpenPositions();

    if (isLoading) {
        return <Text color="#6b7280">Loading Active Trades...</Text>;
    }

    if (error) {
        return <Text color="#dc2626">Error: {error?.message}</Text>;
    }

    if (!positions?.length) {
        return <Text color="#6b7280">No active trades</Text>;
    }

    return (
        <div className={styles.container}>
            {positions.map((trade) => (
                <TradeCard key={trade.trade_id} trade={trade} />
            ))}
        </div>
    );
};
