import { ActiveStrategies } from "./components/ActiveStrategies";
import { StrategiesHistory } from "./components/StrategiesHistory";
import styles from "./StrategiesSection.module.scss";

export const StrategiesSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.title}>Active Strategies</h3>
                <ActiveStrategies />
            </div>
            <div className={styles.section}>
                <h3 className={styles.title}>Strategy History</h3>
                <StrategiesHistory />
            </div>
        </div>
    );
};
