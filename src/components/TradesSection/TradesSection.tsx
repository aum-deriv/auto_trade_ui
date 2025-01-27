import { ActiveTrades } from "./components/ActiveTrades";
import { TradeHistory } from "./components/TradeHistory";
import styles from "./TradesSection.module.scss";

export const TradesSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.title}>Active Trades</h3>
                <ActiveTrades />
            </div>
            <div className={styles.section}>
                <h3 className={styles.title}>Trade History</h3>
                <TradeHistory />
            </div>
        </div>
    );
};
