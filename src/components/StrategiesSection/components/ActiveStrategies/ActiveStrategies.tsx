import { Text } from "@deriv-com/quill-ui";
import { useActiveStrategies } from "../../../../api/hooks/derived/strategies";
import { StrategyCard } from "../StrategyCard";
import styles from "./ActiveStrategies.module.scss";

export const ActiveStrategies = () => {
    const { data: strategies, isLoading, error } = useActiveStrategies();

    if (isLoading) {
        return <Text color="#6b7280">Loading active strategies...</Text>;
    }

    if (error) {
        return <Text color="#dc2626">Error: {error.message}</Text>;
    }

    if (!strategies?.length) {
        return <Text color="#6b7280">No active strategies</Text>;
    }

    return (
        <div className={styles.container}>
            {strategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
        </div>
    );
};
