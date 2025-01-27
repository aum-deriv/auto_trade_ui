import { Text } from "@deriv-com/quill-ui";
import { ActiveTrades } from "./components/ActiveTrades";
import { TradeHistory } from "./components/TradeHistory";
import styles from "./TradesSection.module.scss";

export const TradesSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <Text size="lg" bold>
                    Active Trades
                </Text>
                <ActiveTrades />
            </div>
            <div className={styles.section}>
                <Text size="lg" bold>
                    Trades History
                </Text>
                <TradeHistory />
            </div>
        </div>
    );
};
