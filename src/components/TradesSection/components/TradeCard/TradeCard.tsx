import { Trade } from "../../../../api/hooks/derived/types";
import { Text } from "@deriv-com/quill-ui";
import styles from "./TradeCard.module.scss";

interface TradeCardProps {
    trade: Trade;
}

export const TradeCard = ({ trade }: TradeCardProps) => {
    const isValidExitTime =
        trade.exit_time && trade.exit_time !== "0001-01-01T00:00:00Z";

    return (
        <div className={styles.trade}>
            <Text size="lg" bold>
                {trade.symbol}
            </Text>
            <div className={styles.details}>
                <div className={styles.price}>
                    <Text size="md">
                        Entry: ${trade.entry_price.toFixed(2)}
                    </Text>
                    {trade.exit_price && (
                        <>
                            <Text size="md" className={styles.secondary}>
                                →
                            </Text>
                            <Text size="md" className={styles.secondary}>
                                ${trade.exit_price.toFixed(2)}
                            </Text>
                        </>
                    )}
                </div>
                <div className={styles.time}>
                    <Text size="sm">
                        {new Date(trade.entry_time).toLocaleString()}
                    </Text>
                    {isValidExitTime && trade.exit_time && (
                        <>
                            <Text size="sm" className={styles.secondary}>
                                →
                            </Text>
                            <Text size="sm" className={styles.secondary}>
                                {new Date(trade.exit_time).toLocaleString()}
                            </Text>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
