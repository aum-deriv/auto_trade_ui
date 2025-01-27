import { Trade } from "../../../../api/hooks/derived/types";
import styles from "./TradeCard.module.scss";

interface TradeCardProps {
    trade: Trade;
}

export const TradeCard = ({ trade }: TradeCardProps) => {
    return (
        <div className={styles.trade}>
            <div className={styles.symbol}>{trade.symbol}</div>
            <div className={styles.details}>
                <div className={styles.price}>
                    Entry: ${trade.entry_price.toFixed(2)}
                    {trade.exit_price && (
                        <span className={styles.exitPrice}>
                            → ${trade.exit_price.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className={styles.time}>
                    {new Date(trade.entry_time).toLocaleString()}
                    {trade.exit_time && (
                        <span className={styles.exitTime}>
                            → {new Date(trade.exit_time).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
