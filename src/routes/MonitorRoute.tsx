import styles from "./MonitorRoute.module.scss";
import { TradesSection } from "../components/TradesSection";
import { StrategiesSection } from "../components/StrategiesSection";

export const MonitorRoute = () => {
    return (
        <div className={styles.container}>
            <div className={styles.tradesSection}>
                <TradesSection />
            </div>
            <div className={styles.strategiesSection}>
                <StrategiesSection />
            </div>
        </div>
    );
};
