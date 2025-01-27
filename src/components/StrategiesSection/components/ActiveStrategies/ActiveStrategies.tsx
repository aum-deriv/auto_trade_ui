import { useActiveStrategies } from "../../../../api/hooks/derived/strategies";
import { StrategyCard } from "../StrategyCard";
import styles from "./ActiveStrategies.module.scss";

export const ActiveStrategies = () => {
    const { data: strategies, isLoading, error } = useActiveStrategies();

    if (isLoading) {
        return (
            <div className={styles.message}>Loading active strategies...</div>
        );
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    if (!strategies?.length) {
        return <div className={styles.message}>No active strategies</div>;
    }

    return (
        <div className={styles.container}>
            {strategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
        </div>
    );
};
