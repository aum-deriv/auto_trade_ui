import { Text } from "@deriv-com/quill-ui";
import { useTradeHistory } from "../../../../api/hooks/derived/trades";
import { TradeCard } from "../TradeCard";
import styles from "./TradeHistory.module.scss";

export const TradeHistory = () => {
    const { data: trades, isLoading, error } = useTradeHistory();

    if (isLoading) {
        return <Text color="#6b7280">Loading Trades History...</Text>;
    }

    if (error) {
        return <Text color="#dc2626">Error: {error?.message}</Text>;
    }

    if (!trades?.length) {
        return <Text color="#6b7280">No trades history</Text>;
    }

    return (
        <div className={styles.container}>
            {trades.map((trade) => (
                <TradeCard key={trade.trade_id} trade={trade} />
            ))}
        </div>
    );
};
