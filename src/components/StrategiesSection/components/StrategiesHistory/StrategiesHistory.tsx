import { Text } from "@deriv-com/quill-ui";
import { useStrategiesHistory } from "../../../../api/hooks/derived/strategies/";
import { StrategyCard } from "../StrategyCard";
import styles from "./StrategiesHistory.module.scss";

export const StrategiesHistory = () => {
    const { data: strategies, isLoading, error } = useStrategiesHistory();

    if (!strategies?.length) {
        return <div className={styles.message}>No strategies history</div>;
    }

    if (isLoading) {
        return <Text color="#6b7280">Loading strategies history...</Text>;
    }

    if (error) {
        return <Text color="#dc2626">Error: {error.message}</Text>;
    }

    if (!strategies?.length) {
        return <Text color="#6b7280">No strategies history</Text>;
    }

    return (
        <div className={styles.container}>
            {strategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
        </div>
    );
};
