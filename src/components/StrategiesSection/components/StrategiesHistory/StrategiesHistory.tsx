import { useStrategiesHistory } from "../../../../api/hooks/derived/strategies/";
import { StrategyCard } from "../StrategyCard";
import styles from "./StrategiesHistory.module.scss";

export const StrategiesHistory = () => {
    const { data: strategies, isLoading, error } = useStrategiesHistory();

    if (isLoading) {
        return (
            <div className={styles.message}>Loading strategies history...</div>
        );
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    if (!strategies?.length) {
        return <div className={styles.message}>No strategies history</div>;
    }

    return (
        <div className={styles.container}>
            {strategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
        </div>
    );
};
